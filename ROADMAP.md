# Roadmap - Banner Sanborns Reyes Magos

## 📍 Versiones y Estado

### ✅ v1.0.0-lite (ACTUAL - 13 Dic 2025)
**Estado:** ✅ Producción  
**Tipo:** Versión LITE - Búsqueda Local Inteligente

**Características:**
- Búsqueda local por keywords (ProductMatcher)
- Productos dinámicos virtuales
- Sin dependencias externas
- Ultra rápido (respuesta instantánea)
- 100% compatible con SafeFrame restrictivo
- Tamaño: 52KB

**Ventajas:**
- ✅ Sin costos de API
- ✅ Sin latencia de red
- ✅ Funciona offline
- ✅ Compatible con cualquier entorno

**Limitaciones:**
- Búsqueda basada en keywords (no procesamiento de lenguaje natural avanzado)
- No entiende intenciones complejas o contexto conversacional

---

### 🚧 v2.0.0-pro (PRÓXIMO)
**Estado:** 🔄 En desarrollo  
**Tipo:** Versión PRO - Con Gemini API

**Características planificadas:**
- Sistema híbrido IA + Local
- Procesamiento de lenguaje natural (Gemini API)
- Entendimiento de intenciones complejas
- Contexto conversacional
- Múltiples productos en una solicitud
- Fallback automático a búsqueda local si API falla

**Mejoras vs LITE:**
- 🧠 Entiende frases complejas: "quiero un iPhone para mi mamá"
- 🎯 Mejor precisión en recomendaciones
- 💬 Contexto conversacional
- 🔄 Múltiples productos: "quiero un iPhone y una smart TV"

**Requisitos:**
- API key de Gemini (Google AI Studio)
- Cloudflare Pages Function para proxy seguro
- Conexión a internet (con fallback local)

**Timeline estimado:** Q1 2026

---

## 🔄 Diferencias entre Versiones

| Característica | v1.0.0-lite | v2.0.0-pro |
|---------------|-------------|------------|
| **Búsqueda** | Keywords locales | IA + Local (híbrido) |
| **Velocidad** | Instantánea | ~1-3s (con API) |
| **Costo** | $0 | ~$0.01-0.05 por 1000 requests |
| **Dependencias** | Ninguna | Gemini API |
| **Offline** | ✅ Funciona | ⚠️ Fallback local |
| **SafeFrame restrictivo** | ✅ 100% compatible | ✅ Con fallback |
| **Lenguaje natural** | ⚠️ Limitado | ✅ Avanzado |
| **Múltiples productos** | ⚠️ Limitado | ✅ Completo |
| **Contexto conversacional** | ❌ No | ✅ Sí |

---

## 📅 Timeline

### Fase 1: v1.0.0-lite ✅ (Completado)
- **Fecha:** 13 Dic 2025
- **Objetivo:** Versión estable con búsqueda local
- **Estado:** ✅ Producción

### Fase 2: v2.0.0-pro 🚧 (En desarrollo)
- **Fecha estimada:** Q1 2026
- **Objetivo:** Integración completa con Gemini API
- **Tareas:**
  - [ ] Optimizar prompts de Gemini
  - [ ] Implementar sistema híbrido robusto
  - [ ] Testing exhaustivo de fallback
  - [ ] Documentación de API key setup
  - [ ] Monitoreo de costos

### Fase 3: v2.1.0 (Futuro)
- **Mejoras planificadas:**
  - Personalización por usuario
  - Historial de búsquedas
  - Recomendaciones basadas en comportamiento
  - Integración con más APIs (precios, disponibilidad)

---

## 🎯 Criterios de Decisión: ¿LITE o PRO?

### Usa v1.0.0-lite si:
- ✅ Necesitas máxima compatibilidad
- ✅ Quieres cero costos operativos
- ✅ Priorizas velocidad (respuesta instantánea)
- ✅ El entorno es restrictivo (SafeFrame cerrado)
- ✅ Las búsquedas son simples (keywords directos)

### Usa v2.0.0-pro si:
- ✅ Necesitas entender lenguaje natural complejo
- ✅ Quieres contexto conversacional
- ✅ Los usuarios piden múltiples productos
- ✅ Tienes presupuesto para API (~$0.01-0.05/1000 requests)
- ✅ Puedes configurar API key en Cloudflare Pages

---

## 📊 Métricas de Éxito

### v1.0.0-lite
- ✅ Tasa de éxito en búsqueda: >85%
- ✅ Tiempo de respuesta: <100ms
- ✅ Compatibilidad: 100% en SafeFrame restrictivo
- ✅ Tamaño: 52KB (<200KB requerido)

### v2.0.0-pro (Objetivos)
- 🎯 Tasa de éxito en búsqueda: >95%
- 🎯 Tiempo de respuesta: <3s (con API)
- 🎯 Precisión en recomendaciones: >90%
- 🎯 Costo por 1000 requests: <$0.05

---

## 🔗 Enlaces

- **Repositorio:** https://github.com/Ricmonpa/carta-reyes-magos
- **Release Notes v1.0.0-lite:** `RELEASE-NOTES.md`
- **Deploy Producción:** https://sanborns-reyes-magos.pages.dev

---

**Última actualización:** 13 de Diciembre, 2025

