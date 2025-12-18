const express = require('express');
const router = express.Router();

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
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_api_key_here') {
            return res.status(503).json({
                success: false,
                error: 'API_KEY_NOT_CONFIGURED',
                message: 'La API key de Gemini no está configurada.'
            });
        }

        // Construir contexto adicional del usuario
        let contextPrompt = SYSTEM_CONTEXT;
        if (userContext) {
            contextPrompt += `\n\nInformación del usuario actual:`;
            if (userContext.preferences) {
                const { genres, favoriteAuthors, booksPerMonth } = userContext.preferences;
                if (genres?.length > 0) contextPrompt += `\n- Géneros favoritos: ${genres.join(', ')}`;
                if (favoriteAuthors?.length > 0) contextPrompt += `\n- Autores favoritos: ${favoriteAuthors.join(', ')}`;
                if (booksPerMonth) contextPrompt += `\n- Lee aprox. ${booksPerMonth} libros/mes`;
            }
            if (userContext.booksCount) contextPrompt += `\n- Tiene ${userContext.booksCount} libros registrados`;
        }

        const fullPrompt = `${contextPrompt}\n\nUsuario: ${message}\n\nAsistente:`;

        // Lista de modelos a probar
        const modelsToTry = [
            'gemini-1.5-flash',
            'gemini-pro',
            'gemini-1.0-pro',
            'gemini-1.5-pro'
        ];

        let responseText = null;
        let usedModel = null;
        let lastError = null;

        // Intentar con cada modelo
        for (const model of modelsToTry) {
            try {
                console.log(`Intentando con modelo: ${model}...`);
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: fullPrompt }] }]
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error?.message || response.statusText);
                }

                if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                    responseText = data.candidates[0].content.parts[0].text;
                    usedModel = model;
                    console.log(`✅ Éxito con modelo: ${model}`);
                    break;
                }
            } catch (error) {
                console.error(`❌ Fallo con ${model}: ${error.message}`);
                lastError = error;
            }
        }

        if (!responseText) {
            throw lastError || new Error('No se pudo generar respuesta con ningún modelo disponible.');
        }

        res.json({
            success: true,
            message: responseText,
            model: usedModel
        });

    } catch (error) {
        console.error('Error en chatbot:', error);
        res.status(500).json({
            success: false,
            error: 'INTERNAL_ERROR',
            message: 'Error al procesar tu mensaje. Por favor intenta de nuevo.',
            details: error.message
        });
    }
});

module.exports = router;
