// Estado del banner (solo en memoria, no localStorage)
const bannerState = {
    isListening: false,
    messages: [],
    voiceHandler: null,
    selectedProducts: []
};

// Referencias a elementos
let messageInput, actionButton, dialogueBubble, ctaSection;

// Inicialización con Enabler
function init() {
    if (typeof Enabler !== 'undefined') {
        Enabler.counter('Banner Visible');
    }
    
    messageInput = document.getElementById('messageInput');
    actionButton = document.getElementById('actionButton');
    dialogueBubble = document.querySelector('.dialogue-bubble');
    ctaSection = document.querySelector('.cta-section');
    
    // Inicializar manejador de voz
    bannerState.voiceHandler = new VoiceHandler();
    
    // Configurar callbacks de voz
    setupVoiceCallbacks();
    
    // Verificar soporte de voz
    if (!bannerState.voiceHandler.checkSupport()) {
        actionButton.style.opacity = '0.3';
        actionButton.style.pointerEvents = 'none';
    }
    
    // Event listeners
    if (actionButton) actionButton.addEventListener('click', handleActionClick);
    if (messageInput) {
        messageInput.addEventListener('input', handleInputChange);
        messageInput.addEventListener('keypress', handleInputKeypress);
    }
    
    // Animación de entrada
    animateEntrance();
}

// Inicializar cuando Enabler esté listo
if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
    init();
} else if (typeof Enabler !== 'undefined') {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
} else {
    // Fallback si no hay Enabler
    document.addEventListener('DOMContentLoaded', init);
}

// Configurar callbacks del manejador de voz
function setupVoiceCallbacks() {
    const voiceHandler = bannerState.voiceHandler;
    
    voiceHandler.onStart = () => {
        bannerState.isListening = true;
        updateButtonState();
        showListeningFeedback();
        if (typeof Enabler !== 'undefined') Enabler.counter('Voice Used');
    };
    
    voiceHandler.onResult = (transcript, confidence) => {
        if (messageInput) {
            messageInput.value = transcript;
            updateButtonState();
            setTimeout(() => {
                handleSendMessage(transcript);
            }, 500);
        }
    };
    
    voiceHandler.onError = (message, errorType) => {
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

function handleInputChange() {
    updateButtonState();
}

function updateButtonState() {
    if (!actionButton || !messageInput) return;
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

function handleActionClick() {
    const mode = actionButton.dataset.mode;
    
    switch(mode) {
        case 'mic':
            handleMicClick();
            break;
        case 'send':
            if (messageInput && messageInput.value.trim()) {
                handleSendMessage(messageInput.value.trim());
            }
            break;
        case 'listening':
            if (bannerState.voiceHandler) bannerState.voiceHandler.stop();
            break;
    }
}

function handleMicClick() {
    if (!bannerState.voiceHandler || !bannerState.voiceHandler.checkSupport()) {
        showErrorFeedback('Tu navegador no soporta reconocimiento de voz.');
        return;
    }
    
    const started = bannerState.voiceHandler.start();
    if (!started) {
        showErrorFeedback('No se pudo iniciar el micrófono.');
    }
}

function showListeningFeedback() {
    if (!dialogueBubble) return;
    dialogueBubble.innerHTML = '<p class="greeting-text"><strong>🎤 Te escucho...</strong></p><p class="sub-text">Dime qué deseas para Reyes</p>';
    dialogueBubble.style.border = '2px solid #FFD700';
    dialogueBubble.style.animation = 'borderPulse 1.5s ease-in-out infinite';
}

function hideListeningFeedback() {
    if (!dialogueBubble) return;
    dialogueBubble.style.border = 'none';
    dialogueBubble.style.animation = '';
}

function showErrorFeedback(message) {
    if (!dialogueBubble) return;
    dialogueBubble.innerHTML = '<p class="greeting-text"><strong>⚠️ Oops!</strong></p><p class="sub-text" style="color: #ff6b6b;">' + message + '</p>';
    setTimeout(() => {
        resetDialogue();
    }, 3000);
}

function resetDialogue() {
    if (!dialogueBubble) return;
    dialogueBubble.innerHTML = '<p class="greeting-text">¡Hola! 👋<br><strong>¿Ya escribiste tu carta a los Reyes Magos?</strong></p><p class="sub-text">Dime qué deseas y te ayudo a encontrarlo en tu Sanborns más cercano</p>';
    dialogueBubble.style.border = 'none';
    dialogueBubble.style.animation = '';
}

function handleInputKeypress(e) {
    if (e.key === 'Enter' && messageInput && messageInput.value.trim()) {
        handleSendMessage(messageInput.value.trim());
    }
}

function handleSendMessage(message) {
    if (typeof Enabler !== 'undefined') Enabler.counter('Message Sent');
    
    bannerState.messages.push({
        type: 'user',
        text: message,
        timestamp: Date.now()
    });
    
    if (messageInput) {
        messageInput.value = '';
        updateButtonState();
    }
    
    showProcessingState();
    
    setTimeout(() => {
        simulateAIResponse(message);
    }, 1000);
}

function showProcessingState() {
    if (!dialogueBubble) return;
    dialogueBubble.innerHTML = '<p class="greeting-text"><strong>✨ Buscando...</strong></p><p class="sub-text">Los Reyes Magos buscan lo mejor para ti</p><div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>';
    const existingProducts = document.getElementById('productsContainer');
    if (existingProducts) existingProducts.style.display = 'none';
}

function simulateAIResponse(userMessage) {
    if (typeof ProductMatcher === 'undefined' || typeof productsDatabase === 'undefined') return;
    
    const matcher = new ProductMatcher(productsDatabase);
    const foundProducts = matcher.findProducts(userMessage);
    const result = matcher.generateResponse(foundProducts);
    
    if (dialogueBubble) {
        dialogueBubble.innerHTML = '<p class="greeting-text"><strong>🎁 ' + result.message + '</strong></p>';
        dialogueBubble.style.border = 'none';
        dialogueBubble.style.animation = '';
    }
    
    displayProducts(result.products);
}

function displayProducts(products) {
    if (!ctaSection) return;
    
    let productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) {
        productsContainer = document.createElement('div');
        productsContainer.id = 'productsContainer';
        productsContainer.className = 'products-container';
        ctaSection.insertAdjacentElement('beforebegin', productsContainer);
    }
    
    productsContainer.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = (index * 0.1) + 's';
        productCard.style.cursor = 'pointer';
        productCard.onclick = () => openProductPage(product);
        
        productCard.innerHTML = '<div class="product-image"><img src="' + (product.imagen || 'images/placeholder.png') + '" alt="' + product.nombre + '" onerror="this.src=\'images/placeholder.png\'">' + (product.descuento > 0 ? '<span class="discount-badge">-' + product.descuento + '%</span>' : '') + '</div><div class="product-info"><h4 class="product-name">' + product.nombre + '</h4><p class="product-brand">' + product.marca + '</p><div class="product-price">' + (product.descuento > 0 ? '<span class="old-price">$' + product.precio.toLocaleString() + '</span>' : '') + '<span class="final-price">$' + product.precio_final.toLocaleString() + '</span></div><p class="product-store">📍 ' + product.tiendas_cercanas[0] + '</p><button class="product-cta">Ver producto →</button></div>';
        productsContainer.appendChild(productCard);
    });
    
    const viewMoreBtn = document.createElement('button');
    viewMoreBtn.className = 'view-more-btn';
    viewMoreBtn.innerHTML = '🛍️ Ver todos en Sanborns';
    viewMoreBtn.onclick = () => exitToUrl('https://www.sanborns.com.mx/#modalPostalCode');
    productsContainer.appendChild(viewMoreBtn);
    
    productsContainer.style.display = 'block';
}

function openProductPage(product) {
    if (typeof Enabler !== 'undefined') Enabler.counter('Product Click');
    
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
    
    let productUrl = product.url_compra || categoryUrls[product.categoria] || "https://www.sanborns.com.mx/";
    
    exitToUrl(productUrl);
    
    if (dialogueBubble) {
        dialogueBubble.innerHTML = '<p class="greeting-text"><strong>✅ ¡Perfecto!</strong></p><p class="sub-text">Abrindo productos de <strong>' + product.categoria + '</strong> en Sanborns</p>';
    }
    
    if (messageInput) {
        setTimeout(() => {
            messageInput.focus();
            messageInput.placeholder = '¿Algo más para tu carta?';
        }, 500);
    }
}

function exitToUrl(url) {
    if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
        Enabler.exit('clickthrough', url);
    } else {
        window.open(url, '_blank');
    }
}

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

const additionalStyles = document.createElement('style');
additionalStyles.textContent = '@keyframes borderPulse{0%,100%{border-color:#FFD700;box-shadow:0 0 15px rgba(255,215,0,0.3)}50%{border-color:#FFA500;box-shadow:0 0 25px rgba(255,215,0,0.6)}}.loading-dots{display:flex;justify-content:center;gap:5px;margin-top:10px}.loading-dots span{font-size:24px;color:#003D7A;animation:bounce 1.4s ease-in-out infinite}.loading-dots span:nth-child(2){animation-delay:0.2s}.loading-dots span:nth-child(3){animation-delay:0.4s}@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}';
document.head.appendChild(additionalStyles);

