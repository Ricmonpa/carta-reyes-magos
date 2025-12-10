export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { message } = await context.request.json();

    if (!message || message.trim().length === 0) {
      throw new Error('Empty message');
    }

    const GEMINI_API_KEY = context.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Eres un asistente navideño de Sanborns México que ayuda a encontrar regalos perfectos.

Usuario dice: "${message}"

Analiza el mensaje y responde SOLO en formato JSON (sin markdown, sin backticks):
{
  "categoria": "categoria_del_producto",
  "keywords": ["palabra1", "palabra2", "palabra3"],
  "mensaje": "respuesta amigable y navideña en máximo 40 palabras"
}

CATEGORÍAS VÁLIDAS: audifonos, celulares, tablets, videojuegos, consolas, perfumes, hogar, libros, juguetes, relojes, ropa, accesorios

EJEMPLOS:

Usuario: "quiero audífonos para correr"
{
  "categoria": "audifonos",
  "keywords": ["audifonos", "inalambricos", "deportivos", "resistentes"],
  "mensaje": "¡Perfecto! Los Reyes Magos encontraron audífonos deportivos ideales para tu entrenamiento. Con descuentos especiales en tu Sanborns más cercano."
}

Usuario: "busco un regalo para mi mamá"
{
  "categoria": "perfumes",
  "keywords": ["perfume", "mujer", "elegante", "premium"],
  "mensaje": "¡Qué lindo detalle! Los Reyes Magos tienen fragancias especiales para consentir a mamá esta Navidad."
}

Usuario: "necesito algo para mi hijo de 8 años"
{
  "categoria": "juguetes",
  "keywords": ["juguetes", "niño", "8 años", "educativo"],
  "mensaje": "¡Excelente! Los Reyes Magos encontraron juguetes perfectos para niños de 8 años. ¡Le encantarán!"
}`
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from Gemini');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(parsed), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Gemini API error:', error.message);

    return new Response(JSON.stringify({
      categoria: '',
      keywords: [],
      mensaje: 'Los Reyes Magos están buscando las mejores opciones para ti',
      fallback: true
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

