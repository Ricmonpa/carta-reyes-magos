// Integración con Gemini API para procesamiento inteligente de mensajes
class GeminiAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        // Intentar con Gemini 1.5 Flash primero (tier gratuito)
        // Si falla, el código tiene fallback automático
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        this.productsDatabase = null; // Se inyecta desde products-data.js
    }

    // Inyectar base de datos de productos
    setProductsDatabase(database) {
        this.productsDatabase = database;
    }

    // Procesar mensaje del usuario con Gemini
    async processMessage(userMessage) {
        if (!this.apiKey) {
            console.warn('⚠️ Gemini API key no configurada, usando fallback');
            return this.fallbackToKeywordMatching(userMessage);
        }

        // Construir prompt inteligente
        const prompt = this.buildPrompt(userMessage);
        
        // Lista de modelos a probar (en orden de preferencia)
        const models = [
            'gemini-2.0-flash-001',  // Este funciona con billing
            'gemini-1.5-flash',
            'gemini-2.0-flash'
        ];
        
        // Intentar con cada modelo
        for (const model of models) {
            try {
                const result = await this.tryModel(model, prompt, userMessage);
                if (result) {
                    return result;
                }
            } catch (error) {
                continue;
            }
        }
        
        // Si todos los modelos fallan, usar fallback
        console.warn('⚠️ Todos los modelos fallaron, usando sistema de keywords');
        return this.fallbackToKeywordMatching(userMessage);
    }
    
    // Intentar llamar a un modelo específico
    async tryModel(modelName, prompt, userMessage) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
        
        try {
            const response = await fetch(`${url}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.warn(`⚠️ ${modelName} error ${response.status}:`, errorData.error?.message || errorData);
                // Si es error 429 (quota) o 404 (modelo no disponible), continuar con siguiente modelo
                if (response.status === 429 || response.status === 404) {
                    return null;
                }
                throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0]) {
                throw new Error('No candidates in response');
            }
            
            // Parsear respuesta de Gemini
            const geminiResponse = data.candidates[0].content.parts[0].text;
            return this.parseGeminiResponse(geminiResponse, userMessage);
            
        } catch (error) {
            console.error(`❌ Error en ${modelName}:`, error.message);
            // Si es un error de red o parsing, lanzar para que se intente siguiente modelo
            if (error.message.includes('API Error: 429') || error.message.includes('API Error: 404')) {
                return null;
            }
            // Si es un error de red/fetch, también devolver null para intentar siguiente modelo
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                console.warn(`⚠️ Error de red con ${modelName}, intentando siguiente...`);
                return null;
            }
            throw error;
        }
    }

    // Construir prompt inteligente para Gemini
    // NUEVO ENFOQUE: Gemini identifica CATEGORÍAS y KEYWORDS, no IDs
    buildPrompt(userMessage) {
        return `Eres un asistente de los Reyes Magos para Sanborns México. Analiza el mensaje del usuario y extrae información.

MENSAJE DEL USUARIO:
"${userMessage}"

CATEGORÍAS DISPONIBLES (usa EXACTAMENTE estos nombres):
- celular (iPhone, Samsung Galaxy, Motorola, smartphones, teléfono)
- tablet (iPad, Samsung Tab, tablets)
- pantallas (Smart TV, televisor, pantalla, tv, television)
- audifonos (AirPods, Beats, audífonos, headphones, auriculares)
- juguetes (LEGO, Hot Wheels, muñecas, juegos para niños)
- videojuegos (videojuegos, games, juegos de consola)
- perfumes (fragancias, colonias, perfumes para hombre/mujer)
- consola (PlayStation, Nintendo Switch, Xbox, PS5, consolas)
- hogar (cafeteras, licuadoras, electrodomésticos, cocina)
- libros (libros, novelas, lectura)
- relojes (smartwatch, Apple Watch, relojes, reloj)
- bolsas (bolsos, mochilas, accesorios, cartera)
- vinos (vino, vinos, licores, bebidas alcohólicas, champagne, espumoso)
- cremas (crema, cremas, facial, hidratante, skincare, cuidado de piel, cara, rostro)

INSTRUCCIONES:
1. Identifica TODAS las categorías de productos mencionados
2. Extrae palabras clave específicas (marcas, tipos específicos)
3. Identifica contexto emocional si existe
4. Genera un mensaje navideño personalizado

RESPONDE SOLO JSON:
{
  "categorias": ["celular", "pantalla"],
  "keywords": ["iphone", "smart tv"],
  "mensaje": "Mensaje navideño personalizado",
  "contexto": "resumen del contexto emocional"
}

EJEMPLOS:

Usuario: "Quiero un iPhone"
→ {"categorias": ["celular"], "keywords": ["iphone", "apple"], "mensaje": "¡Perfecto! Los Reyes Magos encontraron iPhones para ti", "contexto": "deseo directo"}

Usuario: "Este año fue difícil pero me porté bien y quiero un iPhone y una smart tv"
→ {"categorias": ["celular", "pantallas"], "keywords": ["iphone", "smart tv", "television"], "mensaje": "¡Los Reyes Magos reconocen tu esfuerzo! Encontramos lo que pediste", "contexto": "merecido después de año difícil"}

Usuario: "Quiero algo para mi mamá"
→ {"categorias": ["perfumes", "bolsas", "relojes"], "keywords": ["regalo", "mujer", "mama"], "mensaje": "¡Qué lindo detalle! Encontramos regalos perfectos para mamá", "contexto": "regalo para otra persona"}

Usuario: "Quiero una tablet y unos audífonos"
→ {"categorias": ["tablet", "audifonos"], "keywords": ["tablet", "audifonos"], "mensaje": "¡Excelente! Los Reyes tienen tablets y audífonos para ti", "contexto": "deseo múltiple"}

RESPUESTA JSON:`;
    }

    // Parsear respuesta de Gemini - NUEVO: usa categorías y keywords
    parseGeminiResponse(geminiResponse, originalMessage) {
        try {
            // Extraer JSON de la respuesta
            const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }

            const parsed = JSON.parse(jsonMatch[0]);
            
            // Buscar productos usando categorías y keywords de Gemini
            let foundProducts = this.findProductsByCategoriesAndKeywords(
                parsed.categorias || [],
                parsed.keywords || [],
                originalMessage
            );
            
            // Si no encontró productos pero Gemini detectó categorías específicas (como vinos)
            // que no están en nuestra DB, devolver mensaje especial
            if (foundProducts.length === 0 && parsed.categorias && parsed.categorias.length > 0) {
                const categoriaDetectada = parsed.categorias[0];
                
                // Verificar si la categoría existe en la DB
                const categoriaExiste = this.productsDatabase && this.productsDatabase[categoriaDetectada];
                
                if (!categoriaExiste) {
                    // Categoría detectada pero no en DB (ej: vinos)
                    return {
                        message: parsed.mensaje || `¡Perfecto! Los Reyes Magos encontraron lo que buscas. Te llevamos a la categoría de ${categoriaDetectada}.`,
                        products: [], // Sin productos, solo redirección
                        context: parsed.contexto || 'deseo general',
                        redirectCategory: categoriaDetectada // Flag para redirección
                    };
                }
            }
            
            // Si no encontró nada, usar el mensaje original directamente
            if (foundProducts.length === 0) {
                // Si no hay match en DB, se usa fallback más abajo
                const matcher = new ProductMatcher(this.productsDatabase);
                foundProducts = matcher.findProducts(originalMessage);
            }
            
            return {
                message: parsed.mensaje || `¡Los Reyes Magos encontraron ${foundProducts.length} opciones para ti!`,
                products: foundProducts,
                context: parsed.contexto || 'deseo general'
            };

        } catch (error) {
            console.error('Error parsing Gemini response:', error);
            return this.fallbackToKeywordMatching(originalMessage);
        }
    }
    
    // NUEVO: Buscar productos por categorías y keywords
    findProductsByCategoriesAndKeywords(categorias, keywords, originalMessage) {
        if (!this.productsDatabase) return [];
        
        let foundProducts = [];
        const allKeywords = [...keywords, ...originalMessage.toLowerCase().split(/\s+/)];
        
        // Buscar por cada categoría identificada por Gemini
        for (const categoria of categorias) {
            const categoryProducts = this.productsDatabase[categoria];
            if (categoryProducts && Array.isArray(categoryProducts)) {
                // Priorizar productos que coincidan con keywords
                const matchingProducts = categoryProducts.filter(product => {
                    const productText = `${product.nombre} ${product.marca} ${product.tags?.join(' ')}`.toLowerCase();
                    return allKeywords.some(kw => productText.includes(kw.toLowerCase()));
                });
                
                if (matchingProducts.length > 0) {
                    foundProducts.push(...matchingProducts);
                } else {
                    // Si no hay match específico, agregar los primeros de la categoría
                    foundProducts.push(...categoryProducts.slice(0, 2));
                }
            }
        }
        
        // Eliminar duplicados y limitar a 5
        foundProducts = [...new Map(foundProducts.map(p => [p.id, p])).values()];
        return foundProducts.slice(0, 5);
    }
    
    // Fallback al sistema de keywords si Gemini falla
    fallbackToKeywordMatching(userMessage) {
        if (!this.productsDatabase) {
            return {
                message: "No encontré productos, pero puedes buscar en Sanborns",
                products: [],
                context: "fallback"
            };
        }

        const matcher = new ProductMatcher(this.productsDatabase);
        const foundProducts = matcher.findProducts(userMessage);
        const result = matcher.generateResponse(foundProducts);
        
        return {
            message: result.message,
            products: result.products,
            context: "keyword_matching"
        };
    }
}

// Exportar
window.GeminiAPI = GeminiAPI;

