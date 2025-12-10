# 🧠 Integración Gemini API - Guía de Configuración

## 📋 ¿Qué hace Gemini?

Gemini procesa mensajes naturales complejos y extrae múltiples productos:

**Ejemplos:**
- "Quiero un iPhone" → Encuentra iPhones disponibles
- "Este año fue difícil pero me porté bien y quiero un iPhone y una smart tv" → Encuentra ambos productos
- "Algo para mi mamá" → Sugiere perfumes y accesorios para mujer
- "Me porté muy bien este año" → Sugiere productos premium como recompensa

## 🔑 Obtener API Key

1. Ve a: https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Click en **"Create API Key"**
4. Copia la key generada

## ⚙️ Configuración

### Opción 1: En el código (desarrollo)

Edita `index.html` línea ~60:

```javascript
window.GEMINI_API_KEY = 'TU_API_KEY_AQUI';
```

### Opción 2: Variable de entorno (producción)

Si usas un servidor, configura:

```bash
GEMINI_API_KEY=tu_key_aqui
```

Y en el código:
```javascript
window.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
```

### Opción 3: Archivo de configuración (recomendado)

Crea `config.js`:

```javascript
window.GEMINI_API_KEY = 'tu_key_aqui';
```

Y agrega antes de `main.js`:
```html
<script src="config.js"></script>
```

**⚠️ IMPORTANTE:** No subas `config.js` a Git. Agrégalo a `.gitignore`

## 🧪 Testing

1. Abre `index.html` en el navegador
2. Abre la consola (F12)
3. Escribe: "Quiero un iPhone y una tablet"
4. Deberías ver en consola: `✅ Gemini procesó el mensaje`

## 🔄 Fallback Automático

Si Gemini falla o no está configurada:
- ✅ Usa automáticamente el sistema de keywords
- ✅ El banner sigue funcionando normalmente
- ✅ No hay errores visibles para el usuario

## 💰 Costos

- **Gemini 1.5 Flash:** Gratis hasta 15 requests/minuto
- **Límite diario:** 1,500 requests/día (gratis)
- **Más info:** https://ai.google.dev/pricing

## 🚀 Para Producción

1. **Rate Limiting:** Implementa caché de respuestas similares
2. **Error Handling:** Ya está implementado con fallback
3. **Security:** Nunca expongas la API key en el frontend público
   - Mejor: crear un endpoint backend que haga la llamada
   - Alternativa: usar restricciones de dominio en Google Cloud Console

## 📝 Ejemplo de Respuesta Gemini

**Input:**
```
"Este año fue difícil pero me porté muy bien y quiero un iPhone y una smart tv"
```

**Output:**
```json
{
  "productos": ["ELEC_CEL_005", "ELEC_TV_041"],
  "mensaje": "¡Los Reyes Magos reconocen tu esfuerzo! Encontré un iPhone y una Smart TV perfectos para ti",
  "contexto": "merecido después de año difícil"
}
```

## 🔧 Troubleshooting

**Error: "API key not configured"**
→ Agrega `window.GEMINI_API_KEY` en `index.html`

**Error: "API Error: 429"**
→ Límite de requests excedido, espera 1 minuto

**Error: "API Error: 403"**
→ API key inválida o restricciones de dominio

**No encuentra productos:**
→ Verifica que `productsDatabase` esté cargado antes de Gemini

## 📚 Documentación

- Gemini API: https://ai.google.dev/docs
- Pricing: https://ai.google.dev/pricing
- API Explorer: https://aistudio.google.com/app/apikey

