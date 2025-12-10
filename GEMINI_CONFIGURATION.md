# 🔐 Configuración de Gemini API Key

## ✅ Estado Actual

- ✅ API Key configurada en `config.js`
- ✅ Integración lista para usar
- ⚠️ **IMPORTANTE:** La key está en el frontend (no ideal para producción)

## 🔧 Configuración en Google AI Studio

### 1. Verificar API Key

1. Ve a: https://aistudio.google.com/app/apikey
2. Verifica que tu key esté activa
3. Revisa el uso y límites

### 2. Habilitar Capacidades (si es necesario)

Por defecto, Gemini 1.5 Flash ya está habilitado. Verifica:

1. En Google AI Studio → Settings
2. Asegúrate que **"Gemini 1.5 Flash"** esté habilitado
3. Revisa los límites de rate (15 req/min gratis)

### 3. Restricciones de Seguridad (RECOMENDADO)

**Para Desarrollo/Testing:**
- ✅ Puedes dejar sin restricciones por ahora
- ⚠️ Solo para testing local

**Para Producción (MUY IMPORTANTE):**

1. Ve a: https://console.cloud.google.com/apis/credentials
2. Encuentra tu API key
3. Click en "Edit"
4. En **"Application restrictions"**:
   - Selecciona **"HTTP referrers (web sites)"**
   - Agrega tus dominios:
     ```
     https://n3ads-sanbornsreyes.pottential.site/*
     https://www.sanborns.com.mx/*
     http://localhost:* (solo para desarrollo)
     ```
5. En **"API restrictions"**:
   - Selecciona **"Restrict key"**
   - Solo habilita: **"Generative Language API"**
6. Guarda cambios

### 4. Límites y Cuotas

**Gratis (Tier 1):**
- 15 requests/minuto
- 1,500 requests/día
- Suficiente para testing y desarrollo

**Si necesitas más:**
- Ve a Google Cloud Console
- Configura billing
- Aumenta cuotas según necesites

## 🧪 Testing

1. Abre `index.html` en navegador
2. Abre consola (F12)
3. Escribe: "Quiero un iPhone"
4. Deberías ver: `✅ Gemini procesó el mensaje`

## ⚠️ Seguridad - Frontend vs Backend

**Problema Actual:**
- La API key está expuesta en el frontend
- Cualquiera puede verla en el código fuente
- Pueden usarla para hacer requests

**Solución Recomendada (Producción):**

### Opción A: Backend Proxy (MEJOR)
```
Frontend → Tu Backend → Gemini API
```
- La key solo está en el servidor
- Más seguro
- Puedes agregar rate limiting

### Opción B: Restricciones de Dominio
- Configura restricciones HTTP referrers
- Solo funciona desde tus dominios
- Menos seguro pero mejor que nada

### Opción C: API Key Restringida
- Restringe a solo "Generative Language API"
- Limita a tus dominios
- Monitorea uso en Google Cloud Console

## 📊 Monitoreo

1. Ve a: https://console.cloud.google.com/apis/dashboard
2. Selecciona "Generative Language API"
3. Revisa:
   - Requests por día
   - Errores
   - Costos (si aplica)

## 🚨 Si la Key se Compromete

1. Ve a Google AI Studio
2. Elimina la key comprometida
3. Crea una nueva
4. Actualiza `config.js`
5. Configura restricciones inmediatamente

## ✅ Checklist de Configuración

- [x] API Key configurada en `config.js`
- [ ] Verificar que Gemini 1.5 Flash esté habilitado
- [ ] Configurar restricciones de dominio (producción)
- [ ] Configurar restricciones de API (solo Generative Language)
- [ ] Probar que funciona
- [ ] Monitorear uso inicial
- [ ] Planear migración a backend (producción)

## 📝 Notas

- Para desarrollo local: está bien sin restricciones
- Para producción: **DEBES** configurar restricciones
- Considera crear un backend proxy para mayor seguridad
- Monitorea el uso regularmente

