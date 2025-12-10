// Test directo de Gemini API con nuevo enfoque de categorías
const API_KEY = 'AIzaSyCyrfZxVlxRzDqtezKCQW8E_bGjawvYptk';
const MODELS = ['gemini-1.5-flash', 'gemini-2.0-flash-001', 'gemini-2.0-flash'];

async function testGeminiAPI() {
    console.log('🧪 Probando Gemini API con enfoque de categorías...\n');
    
    const testMessage = 'Quiero un iPhone y una smart tv';
    console.log(`📝 Mensaje de prueba: "${testMessage}"\n`);
    
    // NUEVO PROMPT: pide categorías y keywords, NO IDs
    const prompt = `Eres un asistente de los Reyes Magos para Sanborns México. Analiza el mensaje del usuario y extrae información.

MENSAJE DEL USUARIO:
"${testMessage}"

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

INSTRUCCIONES:
1. Identifica TODAS las categorías de productos mencionados
2. Extrae palabras clave específicas (marcas, tipos específicos)
3. Identifica contexto emocional si existe
4. Genera un mensaje navideño personalizado

RESPONDE SOLO JSON:
{
  "categorias": ["celular", "pantallas"],
  "keywords": ["iphone", "smart tv"],
  "mensaje": "Mensaje navideño personalizado",
  "contexto": "resumen del contexto emocional"
}

EJEMPLOS:

Usuario: "Quiero un iPhone"
→ {"categorias": ["celular"], "keywords": ["iphone", "apple"], "mensaje": "¡Perfecto! Los Reyes Magos encontraron iPhones para ti", "contexto": "deseo directo"}

Usuario: "Quiero un iPhone y una smart tv"
→ {"categorias": ["celular", "pantallas"], "keywords": ["iphone", "smart tv"], "mensaje": "¡Los Reyes Magos encontraron lo que pediste!", "contexto": "deseo múltiple"}

RESPUESTA JSON:`;

    for (const model of MODELS) {
        try {
            console.log(`⏳ Intentando con modelo: ${model}...`);
            const startTime = Date.now();
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
            
            const response = await fetch(`${url}?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
                })
            });

            const duration = Date.now() - startTime;
            
            if (!response.ok) {
                if (response.status === 429 || response.status === 404) {
                    console.log(`⚠️ ${model} no disponible (${response.status}), probando siguiente...\n`);
                    continue;
                }
                console.error(`❌ Error HTTP ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log(`✅ ¡ÉXITO con ${model}! (${duration}ms)\n`);
            
            if (data.candidates && data.candidates[0]) {
                const text = data.candidates[0].content.parts[0].text;
                console.log('💬 Texto de Gemini:');
                console.log(text);
                
                try {
                    const jsonMatch = text.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);
                        console.log('\n✅ JSON parseado:');
                        console.log(JSON.stringify(parsed, null, 2));
                        
                        // Verificar que tiene las keys correctas
                        if (parsed.categorias && parsed.keywords) {
                            console.log('\n🎯 VERIFICACIÓN:');
                            console.log(`   Categorías: ${parsed.categorias.join(', ')}`);
                            console.log(`   Keywords: ${parsed.keywords.join(', ')}`);
                            console.log(`   Mensaje: ${parsed.mensaje}`);
                            console.log('\n🎉 ¡TEST EXITOSO - FORMATO CORRECTO!');
                        } else {
                            console.log('\n⚠️ Formato incorrecto - falta categorias o keywords');
                        }
                        return;
                    }
                } catch (e) {
                    console.log('\n⚠️ No se pudo parsear JSON');
                }
            }
            return;
            
        } catch (error) {
            console.error(`❌ Error con ${model}:`, error.message);
            continue;
        }
    }
    
    console.error('\n❌ Todos los modelos fallaron.');
}

testGeminiAPI();
