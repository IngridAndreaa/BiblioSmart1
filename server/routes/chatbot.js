const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Contexto del sistema para BiblioSmart
const SYSTEM_CONTEXT = `Eres un asistente virtual especializado en BiblioSmart, una aplicación de gestión de biblioteca personal.

Tu rol es ayudar a los usuarios con:
- Recomendaciones de libros personalizadas basadas en sus preferencias
- Información sobre libros, autores y géneros literarios
- Ayuda con el uso de la aplicación BiblioSmart
- Respuestas sobre gestión de biblioteca personal

Características de BiblioSmart:
- Los usuarios pueden registrar libros con título, autor, ISBN, fecha de ingreso, estado de lectura y calificación
- Pueden ver y editar sus libros registrados
- El sistema tiene géneros como: Fantasía, Ciencia Ficción, Romance, Misterio, Suspenso, Biografía, No Ficción, Historia
- Los usuarios tienen preferencias literarias configurables

Mantén un tono amigable, profesional y entusiasta sobre la lectura. Sé conciso pero informativo.`;

// POST /api/chatbot/message
router.post('/message', async (req, res) => {
    try {
        const { message, userContext } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'El mensaje es requerido'
            });
        }

        // Verificar si hay API key configurada
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
            return res.status(503).json({
                success: false,
                error: 'API_KEY_NOT_CONFIGURED',
                message: 'La API key de Gemini no está configurada. Por favor, configura GEMINI_API_KEY en el archivo .env'
            });
        }

        // Construir contexto adicional del usuario si está disponible
        let contextPrompt = SYSTEM_CONTEXT;

        if (userContext) {
            contextPrompt += `\n\nInformación del usuario actual:`;

            if (userContext.preferences) {
                const { genres, favoriteAuthors, booksPerMonth } = userContext.preferences;
                if (genres && genres.length > 0) {
                    contextPrompt += `\n- Géneros favoritos: ${genres.join(', ')}`;
                }
                if (favoriteAuthors && favoriteAuthors.length > 0) {
                    contextPrompt += `\n- Autores favoritos: ${favoriteAuthors.join(', ')}`;
                }
                if (booksPerMonth) {
                    contextPrompt += `\n- Lee aproximadamente ${booksPerMonth} libros al mes`;
                }
            }

            if (userContext.booksCount) {
                contextPrompt += `\n- Tiene ${userContext.booksCount} libros registrados en su biblioteca`;
            }
        }

        // Obtener el modelo Gemini
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: contextPrompt
        });

        // Configuración de generación
        const generationConfig = {
            temperature: 0.9,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
        };

        // Generar respuesta
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: message }] }],
            generationConfig,
        });

        const response = result.response;
        const text = response.text();

        res.json({
            success: true,
            message: text,
            model: 'gemini-1.5-flash'
        });

    } catch (error) {
        console.error('Error en chatbot:', error);

        // Manejar diferentes tipos de errores
        if (error.message && error.message.includes('API_KEY_INVALID')) {
            return res.status(401).json({
                success: false,
                error: 'API_KEY_INVALID',
                message: 'La API key de Gemini no es válida. Verifica tu configuración.'
            });
        }

        if (error.message && error.message.includes('QUOTA_EXCEEDED')) {
            return res.status(429).json({
                success: false,
                error: 'QUOTA_EXCEEDED',
                message: 'Se ha excedido la cuota de la API. Intenta más tarde.'
            });
        }

        res.status(500).json({
            success: false,
            error: 'INTERNAL_ERROR',
            message: 'Error al procesar tu mensaje. Por favor, intenta de nuevo.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
