# ⚠️ Problema de Cuota Gemini API

## 🔍 Diagnóstico

El error 429 indica que:
- ✅ La API key es válida
- ✅ La conexión funciona
- ❌ **Cuota gratuita agotada o no habilitada**

## 🔧 Soluciones

### Opción 1: Habilitar Billing (Recomendado para Producción)

1. Ve a: https://console.cloud.google.com/billing
2. Crea o vincula una cuenta de facturación
3. Los primeros $300 son gratis (Google Cloud Credits)
4. Gemini 2.0 Flash es muy económico (~$0.075 por 1M tokens)

### Opción 2: Verificar Cuota Gratuita

1. Ve a: https://aistudio.google.com/app/apikey
2. Revisa el uso actual
3. Verifica si hay límites diarios alcanzados
4. Espera 24 horas para reset de cuota diaria

### Opción 3: Usar Modelo Diferente

Los modelos disponibles según la API:
- `gemini-2.5-flash` - Más nuevo, puede requerir billing
- `gemini-2.0-flash-001` - Versión estable
- `gemini-2.0-flash` - Experimental

**Nota:** Todos parecen requerir billing habilitado.

## 📊 Estado Actual

- ✅ API Key: Configurada y válida
- ✅ Código: Funcional
- ⚠️ Cuota: Necesita billing o esperar reset

## 🚀 Próximos Pasos

1. **Para Testing Inmediato:**
   - Habilitar billing en Google Cloud
   - O esperar reset de cuota (si aplica)

2. **Para Producción:**
   - Habilitar billing (recomendado)
   - Configurar restricciones de dominio
   - Monitorear uso y costos

## 💰 Costos Estimados

- Gemini 2.0 Flash: ~$0.075 por 1M tokens input
- Request típico: ~500-1000 tokens
- 1,000 requests ≈ $0.05-0.10
- Muy económico para producción

## ✅ Verificación

Una vez habilitado billing, el código debería funcionar automáticamente.

El modelo configurado es: `gemini-2.0-flash-001`

