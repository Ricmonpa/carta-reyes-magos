// Estado del banner
const bannerState = {
    isListening: false,
    messages: [],
    voiceHandler: null,
    selectedProducts: [],
    geminiAPI: null,
    dynamicMatcher: null // Sistema dinámico de productos
};

// Helper functions para obtener elementos (siempre funcionan)
function getMessageInput() {
    return document.getElementById('messageInput');
}

function getActionButton() {
    return document.getElementById('actionButton');
}

function getDialogueBubble() {
    return document.querySelector('.dialogue-bubble');
}

function getCtaSection() {
    return document.querySelector('.cta-section');
}

// Referencias a elementos (para compatibilidad)
const messageInput = getMessageInput();
const actionButton = getActionButton();
const dialogueBubble = getDialogueBubble();
const ctaSection = getCtaSection();

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    
    // Verificar que los elementos existan
    if (!messageInput || !actionButton) {
        console.error('❌ Elementos del DOM no encontrados');
        return;
    }
    
    // Inicializar manejador de voz
    bannerState.voiceHandler = new VoiceHandler();
    
    // Inicializar sistema dinámico de productos
    if (typeof DynamicProductMatcher !== 'undefined') {
        bannerState.dynamicMatcher = new DynamicProductMatcher();
    }
    
    // Configurar callbacks de voz
    setupVoiceCallbacks();
    
    // Verificar soporte de voz
    if (!bannerState.voiceHandler.checkSupport()) {
        console.warn('⚠️ Web Speech API no disponible');
    } else {
    }
    
    // Event listeners
    const btn = getActionButton();
    const inp = getMessageInput();
    if (btn) btn.addEventListener('click', handleActionClick);
    if (inp) {
        inp.addEventListener('input', handleInputChange);
        inp.addEventListener('keypress', handleInputKeypress);
    }
    
    // Inicializar estado del botón
    updateButtonState();
    
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
        const input = getMessageInput();
        if (input) input.value = transcript;
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
    const input = getMessageInput();
    const button = getActionButton();
    if (!input || !button) return;
    
    const hasText = input.value.trim().length > 0;
    
    if (bannerState.isListening) {
        button.textContent = '🔴';
        button.dataset.mode = 'listening';
        button.classList.add('listening');
    } else if (hasText) {
        button.textContent = '➤';
        button.dataset.mode = 'send';
        button.classList.remove('listening');
    } else {
        button.textContent = '🎤';
        button.dataset.mode = 'mic';
        button.classList.remove('listening');
    }
}

// Manejar click en botón de acción
function handleActionClick() {
    const button = getActionButton();
    const input = getMessageInput();
    if (!button || !input) return;
    
    const mode = button.dataset.mode;
    
    switch(mode) {
        case 'mic':
            handleMicClick();
            break;
        case 'send':
            if (input.value.trim()) {
                handleSendMessage(input.value.trim());
            }
            break;
        case 'listening':
            bannerState.voiceHandler.stop();
            break;
    }
}

// Manejo del micrófono
function handleMicClick() {
    
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
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
        <p class="greeting-text">
            <strong>🎤 Te escucho...</strong>
        </p>
        <p class="sub-text">
            Dime qué deseas para Reyes
        </p>
    `;
    
    bubble.style.border = '2px solid #FFD700';
    bubble.style.animation = 'borderPulse 1.5s ease-in-out infinite';
}

// Ocultar feedback de escucha
function hideListeningFeedback() {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.style.border = 'none';
    bubble.style.animation = '';
}

// Mostrar error
function showErrorFeedback(message) {
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
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
    const bubble = getDialogueBubble();
    if (!bubble) return;
    bubble.innerHTML = `
        <p class="greeting-text">
            ¡Hola! 👋<br>
            <strong>¿Ya escribiste tu carta a los Reyes Magos?</strong>
        </p>
        <p class="sub-text">
            Dime qué deseas y te ayudo a encontrarlo en tu Sanborns más cercano
        </p>
    `;
    bubble.style.border = 'none';
    bubble.style.animation = '';
}

// Manejo de Enter en input
function handleInputKeypress(e) {
    const input = getMessageInput();
    if (!input) return;
    if (e.key === 'Enter' && input.value.trim()) {
        handleSendMessage(input.value.trim());
    }
}

// Enviar mensaje
async function handleSendMessage(message) {
    const trimmed = (message || '').trim();
    if (!trimmed) return;
    
    bannerState.messages.push({
        type: 'user',
        text: trimmed,
        timestamp: Date.now()
    });
    
    // Limpiar input
    const input = getMessageInput();
    if (input) input.value = '';
    updateButtonState();
    
    // Mostrar que está procesando
    showProcessingState();
    
    let products = [];
    let aiMessage = 'Los Reyes Magos encontraron estas opciones para ti:';
    const matcher = new ProductMatcher(productsDatabase);
    
    // ESTRATEGIA 1: Intentar Gemini vía proxy (timeout 3s)
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: trimmed }),
            signal: controller.signal
        });
        clearTimeout(timer);
        
        if (!response.ok) throw new Error('API response not OK');
        
        const aiData = await response.json();
        if (typeof Enabler !== 'undefined') {
            Enabler.counter('AI Response Success');
        }
        
        // Productos por categoría sugerida
        if (aiData.categoria && productsDatabase[aiData.categoria]) {
            products = productsDatabase[aiData.categoria].slice(0, 3);
        }
        
        // Productos por keywords si faltan
        if (products.length < 3 && aiData.keywords) {
            for (const keyword of aiData.keywords) {
                const found = matcher.findProducts(keyword);
                products = products.concat(found);
                if (products.length >= 3) break;
            }
        }
        
        aiMessage = aiData.mensaje || aiMessage;
        
    } catch (_) {
        // ESTRATEGIA 2: Fallback local
        if (typeof Enabler !== 'undefined') {
            Enabler.counter('AI Fallback to Local');
        }
        const foundProducts = matcher.findProducts(trimmed);
        const localResult = matcher.generateResponse(foundProducts);
        products = localResult.products;
        aiMessage = localResult.message;
    }
    
    // Eliminar duplicados y limitar a 3
    products = [...new Map(products.map(item => [item.id, item])).values()].slice(0, 3);
    
    // Mostrar respuesta
    const bubble = getDialogueBubble();
    if (bubble) {
        bubble.innerHTML = `
            <p class="greeting-text">
                <strong>🎁 ${aiMessage}</strong>
            </p>
        `;
    }
    
    displayProducts(products);
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

// NUEVA FUNCIÓN: Respuesta con productos reales (con Gemini o fallback)
async function simulateAIResponse(userMessage) {
    
    let result;
    
    // Intentar usar Gemini API si está disponible
    if (bannerState.geminiAPI) {
        try {
            result = await bannerState.geminiAPI.processMessage(userMessage);
        } catch (error) {
            console.error('❌ Error con Gemini, usando fallback:', error);
            // Fallback automático
            result = bannerState.geminiAPI.fallbackToKeywordMatching(userMessage);
        }
    } else {
        // Usar sistema de keywords tradicional
        const matcher = new ProductMatcher(productsDatabase);
        const foundProducts = matcher.findProducts(userMessage);
        result = matcher.generateResponse(foundProducts);
    }
    
    // Actualizar diálogo con mensaje
    const bubble = getDialogueBubble();
    if (bubble) {
        bubble.innerHTML = `
            <p class="greeting-text">
                <strong>🎁 ${result.message}</strong>
            </p>
        `;
        bubble.style.border = 'none';
        bubble.style.animation = '';
    }
    
    // Si hay categoría para redirección (ej: vinos que no están en DB)
    // Usar sistema dinámico para generar productos virtuales
    if (result.redirectCategory && bannerState.dynamicMatcher) {
        
        // Buscar categoría en el sistema dinámico
        const categoryMatch = bannerState.dynamicMatcher.findCategory(userMessage);
        
        if (categoryMatch && categoryMatch.category === result.redirectCategory) {
            // Generar productos virtuales para esta categoría
            const virtualProducts = bannerState.dynamicMatcher.generateVirtualProducts(categoryMatch, userMessage);
            result.products = virtualProducts;
        } else {
            // Si no encuentra match exacto, crear productos genéricos para la categoría
            const categoryData = bannerState.dynamicMatcher.categoryMap[result.redirectCategory];
            if (categoryData) {
                const virtualProducts = bannerState.dynamicMatcher.generateVirtualProducts(categoryData, userMessage);
                result.products = virtualProducts;
            }
        }
        
        // Limpiar redirectCategory para que continúe con el flujo normal de mostrar productos
        delete result.redirectCategory;
    }
    
    // Si no hay productos pero tenemos sistema dinámico, usarlo
    if (result.products.length === 0 && bannerState.dynamicMatcher) {
        const categoryMatch = bannerState.dynamicMatcher.findCategory(userMessage);
        
        if (categoryMatch) {
            const virtualProducts = bannerState.dynamicMatcher.generateVirtualProducts(categoryMatch, userMessage);
            result.products = virtualProducts;
            result.message = result.message || `¡Perfecto! Te mostramos opciones de ${categoryMatch.category} en Sanborns`;
        }
    }
    
    // Mostrar productos encontrados (reales o virtuales)
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
        const cta = getCtaSection();
        if (cta) cta.insertAdjacentElement('beforebegin', productsContainer);
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
        
        // Si es producto virtual, mostrar diferente
        const isVirtual = product.isVirtual || product.precio === 0;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}" onerror="this.src='images/placeholder.svg'">
                <span class="discount-badge">Hasta 50% OFF</span>
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.nombre}</h4>
                <p class="product-brand">${product.marca || ''}</p>
                <div class="product-price">
                    <span class="price-label">Descuentos especiales</span>
                    <span class="price-cta">Ver ofertas →</span>
                </div>
                <p class="product-store">📍 ${product.tiendas_cercanas[0]}</p>
                <button class="product-cta" onclick="event.stopPropagation(); openProductPage(product);">
                    Ver en Sanborns →
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

// NUEVA FUNCIÓN: Abrir página del producto en Sanborns (búsqueda optimizada por categoría)
function openProductPage(product) {
    
    dialogueBubble.innerHTML = `
        <p class="greeting-text">
            <strong>✨ Un momento...</strong>
        </p>
        <p class="sub-text">
            Te llevamos a Sanborns 🛍️
        </p>
    `;
    
    setTimeout(() => {
        let productUrl;
        
        // URLs por categoría (fallback para evitar búsquedas que den 404)
        const categoryUrls = {
            'videojuegos': 'https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode',
            'consola': 'https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode',
            'celular': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'tablet': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'audifonos': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'pantallas': 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
            'hogar': 'https://www.sanborns.com.mx/cat/hogar%20y%20oficina/electrodom%C3%A9sticos/preparaci%C3%B3n%20de%20alimentos?id=10801#modalPostalCode',
            'cremas': 'https://www.sanborns.com.mx/cat/farmacia/higiene%20y%20salud/cremas?id=140202#modalPostalCode',
            'vinos': 'https://www.sanborns.com.mx/cat/regalos/vinos%20y%20licores/vinos?id=160201#modalPostalCode'
        };
        
        if (product.url_compra && product.url_compra !== '') {
            productUrl = product.url_compra;
        } else if (categoryUrls[categoria]) {
            productUrl = categoryUrls[categoria];
        } else {
            const categoria = product.categoria?.toLowerCase() || '';
            let cleanName = product.nombre || '';
            
            // LIMPIEZA UNIVERSAL
            cleanName = cleanName
                .replace(/\\d+\\s*GB/gi, '')
                .replace(/\\d+\\s*TB/gi, '')
                .replace(/\\d+\\s*ML/gi, '')
                .replace(/\\d+\\s*L\\b/gi, '')
                .replace(/\\d+\\s*onzas/gi, '')
                .replace(/\\+.*$/gi, '')
                .replace(/[™®©]/g, '')
                .replace(/\\s+/g, ' ')
                .trim();
            
            // LIMPIEZA ESPECÍFICA POR CATEGORÍA
            if (categoria === 'libros') {
                cleanName = cleanName
                    .replace(/\\bEditorial\\b/gi, '')
                    .replace(/\\bTomo\\s+[IVX]+\\b/gi, '')
                    .replace(/\\bEdición\\b/gi, '')
                    .trim();
            }
            
            if (categoria === 'perfumes') {
                cleanName = cleanName
                    .replace(/\\bFragancia\\b/gi, '')
                    .replace(/\\bpara\\s+(dama|caballero|mujer|hombre)\\b/gi, '')
                    .replace(/\\b(EDP|EDT|Eau\\s+de\\s+Parfum|Eau\\s+de\\s+Toilette)\\b/gi, '')
                    .trim();
            }
            
            if (categoria === 'electrónicos' || categoria === 'juguetes') {
                cleanName = cleanName
                    .replace(/\\bReacondicionado\\b/gi, '')
                    .replace(/\\bGrado\\s+A\\b/gi, '')
                    .replace(/\\bcon\\b.*$/gi, '')
                    .replace(/\\bincluye\\b.*$/gi, '')
                    .trim();
            }
            
            // Construir términos de búsqueda
            const searchTerms = [];
            
            if (product.marca && 
                product.marca !== 'Generic' && 
                product.marca !== 'Editorial' &&
                !cleanName.toLowerCase().includes((product.marca || '').toLowerCase())) {
                searchTerms.push(product.marca);
            }
            
            searchTerms.push(cleanName);
            
            const query = encodeURIComponent(searchTerms.join(' ').trim());
            productUrl = `https://www.sanborns.com.mx/resultados?query=${query}#modalPostalCode`;
        }
        
        if (!productUrl) {
            productUrl = 'https://www.sanborns.com.mx/#modalPostalCode';
        }
        
        
        if (typeof Enabler !== 'undefined' && Enabler.isInitialized()) {
            Enabler.exit('clickthrough', productUrl);
        } else {
            window.open(productUrl, '_blank');
        }
        
        dialogueBubble.innerHTML = `
            <p class="greeting-text">
                <strong>✅ ¡Listo!</strong>
            </p>
            <p class="sub-text">
                ¿Quieres buscar algo más?
            </p>
        `;
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

