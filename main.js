// Estado del banner
const bannerState = {
    isListening: false,
    messages: [],
    voiceHandler: null,
    selectedProducts: []
};

// Referencias a elementos
const messageInput = document.getElementById('messageInput');
const actionButton = document.getElementById('actionButton');
const dialogueBubble = document.querySelector('.dialogue-bubble');
const ctaSection = document.querySelector('.cta-section');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎄 Banner Carta a los Reyes Magos - Inicializado');
    
    // Inicializar manejador de voz
    bannerState.voiceHandler = new VoiceHandler();
    
    // Configurar callbacks de voz
    setupVoiceCallbacks();
    
    // Verificar soporte de voz
    if (!bannerState.voiceHandler.checkSupport()) {
        console.warn('⚠️ Web Speech API no disponible');
    } else {
        console.log('✅ Web Speech API disponible');
    }
    
    // Event listeners
    actionButton.addEventListener('click', handleActionClick);
    messageInput.addEventListener('input', handleInputChange);
    messageInput.addEventListener('keypress', handleInputKeypress);
    
    // Animación de entrada
    animateEntrance();
});

// Configurar callbacks del manejador de voz
function setupVoiceCallbacks() {
    const voiceHandler = bannerState.voiceHandler;
    
    voiceHandler.onStart = () => {
        bannerState.isListening = true;
        updateButtonState();
        showListeningFeedback();
    };
    
    voiceHandler.onResult = (transcript, confidence) => {
        console.log('🎤 Texto capturado:', transcript);
        messageInput.value = transcript;
        updateButtonState();
        
        // Auto-enviar después de capturar voz
        setTimeout(() => {
            handleSendMessage(transcript);
        }, 500);
    };
    
    voiceHandler.onError = (message, errorType) => {
        console.error('❌', message);
        showErrorFeedback(message);
        bannerState.isListening = false;
        updateButtonState();
    };
    
    voiceHandler.onEnd = () => {
        bannerState.isListening = false;
        updateButtonState();
        hideListeningFeedback();
    };
}

// Manejar cambio en input - actualizar botón estilo WhatsApp
function handleInputChange() {
    updateButtonState();
}

// Actualizar estado del botón según contenido del input
function updateButtonState() {
    const hasText = messageInput.value.trim().length > 0;
    
    if (bannerState.isListening) {
        actionButton.textContent = '🔴';
        actionButton.dataset.mode = 'listening';
        actionButton.classList.add('listening');
    } else if (hasText) {
        actionButton.textContent = '➤';
        actionButton.dataset.mode = 'send';
        actionButton.classList.remove('listening');
    } else {
        actionButton.textContent = '🎤';
        actionButton.dataset.mode = 'mic';
        actionButton.classList.remove('listening');
    }
}

// Manejar click en botón de acción
function handleActionClick() {
    const mode = actionButton.dataset.mode;
    
    switch(mode) {
        case 'mic':
            handleMicClick();
            break;
        case 'send':
            if (messageInput.value.trim()) {
                handleSendMessage(messageInput.value.trim());
            }
            break;
        case 'listening':
            bannerState.voiceHandler.stop();
            break;
    }
}

// Manejo del micrófono
function handleMicClick() {
    console.log('🎤 Iniciando grabación...');
    
    if (!bannerState.voiceHandler.checkSupport()) {
        showErrorFeedback('Tu navegador no soporta reconocimiento de voz.');
        return;
    }
    
    const started = bannerState.voiceHandler.start();
    if (!started) {
        showErrorFeedback('No se pudo iniciar el micrófono. Verifica los permisos.');
    }
}

// Mostrar feedback visual mientras escucha
function showListeningFeedback() {
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            <strong>🎤 Te escucho...</strong>
        </p>
        <p class="sub-text">
            Dime qué deseas para Reyes
        </p>
    `;
    
    dialogueBubble.style.border = '2px solid #FFD700';
    dialogueBubble.style.animation = 'borderPulse 1.5s ease-in-out infinite';
}

// Ocultar feedback de escucha
function hideListeningFeedback() {
    dialogueBubble.style.border = 'none';
    dialogueBubble.style.animation = '';
}

// Mostrar error
function showErrorFeedback(message) {
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            <strong>⚠️ Oops!</strong>
        </p>
        <p class="sub-text" style="color: #ff6b6b;">
            ${message}
        </p>
    `;
    
    setTimeout(() => {
        resetDialogue();
    }, 3000);
}

// Resetear diálogo al estado inicial
function resetDialogue() {
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            ¡Hola! 👋<br>
            <strong>¿Ya escribiste tu carta a los Reyes Magos?</strong>
        </p>
        <p class="sub-text">
            Dime qué deseas y te ayudo a encontrarlo en tu Sanborns más cercano
        </p>
    `;
    dialogueBubble.style.border = 'none';
    dialogueBubble.style.animation = '';
}

// Manejo de Enter en input
function handleInputKeypress(e) {
    if (e.key === 'Enter' && messageInput.value.trim()) {
        handleSendMessage(messageInput.value.trim());
    }
}

// Enviar mensaje
function handleSendMessage(message) {
    console.log('💬 Mensaje enviado:', message);
    
    bannerState.messages.push({
        type: 'user',
        text: message,
        timestamp: Date.now()
    });
    
    // Limpiar input
    messageInput.value = '';
    updateButtonState();
    
    // Mostrar que está procesando
    showProcessingState();
    
    // Procesar con sistema de productos
    setTimeout(() => {
        simulateAIResponse(message);
    }, 1000);
}

// Mostrar estado de procesamiento
function showProcessingState() {
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            <strong>✨ Buscando...</strong>
        </p>
        <p class="sub-text">
            Los Reyes Magos buscan lo mejor para ti
        </p>
        <div class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
        </div>
    `;
    
    // Ocultar productos anteriores si existen
    const existingProducts = document.getElementById('productsContainer');
    if (existingProducts) {
        existingProducts.style.display = 'none';
    }
}

// NUEVA FUNCIÓN: Respuesta con productos reales
function simulateAIResponse(userMessage) {
    console.log('🤖 Procesando con sistema de productos:', userMessage);
    
    // Inicializar matcher de productos
    const matcher = new ProductMatcher(productsDatabase);
    
    // Buscar productos
    const foundProducts = matcher.findProducts(userMessage);
    const result = matcher.generateResponse(foundProducts);
    
    // Actualizar diálogo con mensaje
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            <strong>🎁 ${result.message}</strong>
        </p>
    `;
    dialogueBubble.style.border = 'none';
    dialogueBubble.style.animation = '';
    
    // Mostrar productos encontrados
    displayProducts(result.products);
}

// NUEVA FUNCIÓN: Mostrar productos
function displayProducts(products) {
    // Crear contenedor de productos si no existe
    let productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) {
        productsContainer = document.createElement('div');
        productsContainer.id = 'productsContainer';
        productsContainer.className = 'products-container';
        // Insertar antes del cta-section
        ctaSection.insertAdjacentElement('beforebegin', productsContainer);
    }
    
    // Limpiar productos anteriores
    productsContainer.innerHTML = '';
    
    // Generar HTML de productos
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        // Hacer toda la tarjeta clickeable
        productCard.style.cursor = 'pointer';
        productCard.onclick = () => openProductPage(product);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}" onerror="this.src='https://via.placeholder.com/150/003D7A/FFFFFF?text=Producto'">
                ${product.descuento > 0 ? `<span class="discount-badge">-${product.descuento}%</span>` : ''}
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.nombre}</h4>
                <p class="product-brand">${product.marca}</p>
                <div class="product-price">
                    ${product.descuento > 0 ? `<span class="old-price">$${product.precio.toLocaleString()}</span>` : ''}
                    <span class="final-price">$${product.precio_final.toLocaleString()}</span>
                </div>
                <p class="product-store">📍 ${product.tiendas_cercanas[0]}</p>
                <button class="product-cta">
                    Ver producto →
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Agregar botón de ver más al final
    const viewMoreBtn = document.createElement('button');
    viewMoreBtn.className = 'view-more-btn';
    viewMoreBtn.innerHTML = '🛍️ Ver todos en Sanborns';
    viewMoreBtn.onclick = () => window.open('https://www.sanborns.com.mx/#modalPostalCode', '_blank');
    productsContainer.appendChild(viewMoreBtn);
    
    // Mostrar con animación
    productsContainer.style.display = 'block';
}

// NUEVA FUNCIÓN: Abrir página del producto en Sanborns
function openProductPage(product) {
    console.log('🛍️ Abriendo producto:', product.nombre);
    
    // URLs de categorías de Sanborns
    const categoryUrls = {
        "Electrónicos": "https://www.sanborns.com.mx/cat/tecnologia?id=1",
        "Juguetes": "https://www.sanborns.com.mx/cat/juguetes-y-dulces?id=114",
        "Videojuegos": "https://www.sanborns.com.mx/cat/juguetes-y-dulces/videojuegos?id=40111",
        "Perfumes": "https://www.sanborns.com.mx/cat/belleza/perfumes?id=69",
        "Hogar": "https://www.sanborns.com.mx/cat/hogar-y-oficina?id=1",
        "Libros": "https://www.sanborns.com.mx/cat/libros-y-revistas?id=17",
        "Ropa/Accesorios": "https://www.sanborns.com.mx/cat/moda?id=3",
        "Accesorios": "https://www.sanborns.com.mx/cat/moda?id=3"
    };
    
    // Usar URL específica del producto o categoría
    let productUrl = product.url_compra || categoryUrls[product.categoria];
    
    // Si no hay categoría, ir al home de Sanborns
    if (!productUrl) {
        productUrl = "https://www.sanborns.com.mx/";
    }
    
    // Tracking (para métricas)
    console.log('📊 Producto clickeado:', {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio_final,
        url: productUrl
    });
    
    // Abrir en nueva pestaña
    window.open(productUrl, '_blank');
    
    // Feedback visual
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            <strong>✅ ¡Perfecto!</strong>
        </p>
        <p class="sub-text">
            Abriendo productos de <strong>${product.categoria}</strong> en Sanborns
        </p>
    `;
    
    // Focus en input para agregar más
    setTimeout(() => {
        messageInput.focus();
        messageInput.placeholder = '¿Algo más para tu carta?';
    }, 500);
}

// Animación de entrada
function animateEntrance() {
    const elements = [
        document.querySelector('.banner-header'),
        document.querySelector('.ai-character'),
        document.querySelector('.dialogue-bubble'),
        document.querySelector('.cta-section')
    ];
    
    elements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Estilos adicionales
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes borderPulse {
        0%, 100% { 
            border-color: #FFD700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
        50% { 
            border-color: #FFA500;
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
        }
    }
    
    .loading-dots {
        display: flex;
        justify-content: center;
        gap: 5px;
        margin-top: 10px;
    }
    
    .loading-dots span {
        font-size: 24px;
        color: #003D7A;
        animation: bounce 1.4s ease-in-out infinite;
    }
    
    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-8px); }
    }
`;
document.head.appendChild(additionalStyles);

console.log('🎁 Banner con sistema de productos - Listo!');
