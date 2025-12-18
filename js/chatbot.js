// Chatbot con IA para BiblioSmart

class BiblioSmartChatbot {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.context = {
            user: null,
            userBooks: [],
            recommendations: []
        };
        this.init();
    }

    init() {
        // Cargar contexto del usuario
        this.context.user = getCurrentUser();
        if (this.context.user) {
            this.context.userBooks = getUserBooks();
            this.context.recommendations = getRecommendations(this.context.user);
        }

        // Mensaje de bienvenida
        this.addBotMessage(
            `¡Hola! 👋 Soy el asistente virtual de BiblioSmart potenciado por IA. Estoy aquí para ayudarte a descubrir nuevos libros y responder tus preguntas sobre literatura. ¿En qué puedo ayudarte hoy?`,
            this.getQuickReplies('welcome')
        );
    }

    addMessage(content, isUser = false, quickReplies = null) {
        const message = {
            content,
            isUser,
            quickReplies,
            timestamp: new Date()
        };
        this.messages.push(message);
        this.renderMessage(message);
    }

    addBotMessage(content, quickReplies = null) {
        this.addMessage(content, false, quickReplies);
    }

    addUserMessage(content) {
        this.addMessage(content, true);
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isUser ? 'user' : 'bot'}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = message.isUser ? '<i class="bi bi-person-fill"></i>' : '<i class="bi bi-robot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = message.content;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        messagesContainer.appendChild(messageDiv);

        // Agregar respuestas rápidas si existen
        if (message.quickReplies && !message.isUser) {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';

            message.quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = reply;
                btn.onclick = () => this.handleQuickReply(reply);
                quickRepliesDiv.appendChild(btn);
            });

            messagesContainer.appendChild(quickRepliesDiv);
        }

        // Scroll al final
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="bi bi-robot"></i>';

        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);
        messagesContainer.appendChild(typingDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async processMessage(userInput) {
        if (!userInput.trim()) return;

        // Agregar mensaje del usuario
        this.addUserMessage(userInput);

        // Limpiar input
        document.getElementById('chatbotInput').value = '';

        // Mostrar indicador de escritura
        this.showTypingIndicator();

        try {
            // Llamar a la API de Gemini
            const response = await this.callGeminiAPI(userInput);

            this.hideTypingIndicator();

            if (response.success) {
                this.addBotMessage(response.message);
            } else {
                // Manejar errores específicos
                if (response.error === 'API_KEY_NOT_CONFIGURED') {
                    this.addBotMessage(
                        '⚠️ El chatbot con IA aún no está configurado. Por favor, configura la API key de Gemini en el servidor.<br><br>Para obtener tu API key gratuita, visita: <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a>',
                        null
                    );
                } else if (response.error === 'API_KEY_INVALID') {
                    this.addBotMessage(
                        '⚠️ La API key configurada no es válida. Por favor, verifica la configuración del servidor.',
                        null
                    );
                } else {
                    this.addBotMessage(
                        'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
                        this.getQuickReplies('welcome')
                    );
                }
            }
        } catch (error) {
            console.error('Error al procesar mensaje:', error);
            this.hideTypingIndicator();

            this.addBotMessage(
                'Lo siento, no pude conectarme con el servidor. Por favor, verifica que el servidor esté ejecutándose en http://localhost:3000',
                null
            );
        }
    }

    async callGeminiAPI(message) {
        try {
            // Preparar contexto del usuario
            const userContext = {
                preferences: this.context.user?.preferences || null,
                booksCount: this.context.userBooks?.length || 0
            };

            const response = await fetch('http://localhost:3000/api/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    userContext: userContext
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al llamar a la API:', error);
            return {
                success: false,
                error: 'NETWORK_ERROR',
                message: 'Error de conexión con el servidor'
            };
        }
    }

    getQuickReplies(context) {
        const replies = {
            welcome: [
                'Recomiéndame un libro',
                'Buscar por género',
                'Mis libros',
                '¿Cómo funciona?'
            ]
        };

        return replies[context] || null;
    }

    handleQuickReply(reply) {
        this.processMessage(reply);
    }
}

// Inicializar chatbot cuando el DOM esté listo
let chatbot;

document.addEventListener('DOMContentLoaded', function () {
    // Crear el widget del chatbot
    createChatbotWidget();

    // Inicializar el chatbot
    chatbot = new BiblioSmartChatbot();
});

function createChatbotWidget() {
    const widget = document.createElement('div');
    widget.className = 'chatbot-widget';
    widget.innerHTML = `
    <div class="chatbot-container" id="chatbotContainer">
      <div class="chatbot-header">
        <div class="chatbot-header-content">
          <div class="chatbot-avatar">
            <i class="bi bi-robot"></i>
          </div>
          <div class="chatbot-header-text">
            <h3>Asistente BiblioSmart</h3>
            <p>Potenciado por IA</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="toggleChatbot()">
          <i class="bi bi-x"></i>
        </button>
      </div>
      
      <div class="chatbot-messages" id="chatbotMessages">
        <!-- Los mensajes se agregarán aquí dinámicamente -->
      </div>
      
      <div class="chatbot-input-container">
        <input 
          type="text" 
          class="chatbot-input" 
          id="chatbotInput" 
          placeholder="Escribe tu mensaje..."
          onkeypress="handleChatbotKeyPress(event)"
        />
        <button class="chatbot-send" onclick="sendChatbotMessage()">
          <i class="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
    
    <button class="chatbot-toggle" onclick="toggleChatbot()">
      <i class="bi bi-chat-dots-fill"></i>
      <span class="chatbot-notification"></span>
    </button>
  `;

    document.body.appendChild(widget);
}

function toggleChatbot() {
    const container = document.getElementById('chatbotContainer');
    container.classList.toggle('active');

    // Enfocar el input cuando se abre
    if (container.classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('chatbotInput').focus();
        }, 300);
    }
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (message && chatbot) {
        chatbot.processMessage(message);
    }
}

function handleChatbotKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}
