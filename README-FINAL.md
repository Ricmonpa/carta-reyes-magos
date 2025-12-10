# Sanborns Reyes Magos 300x600 – DV360 Final

## Changelog (última tanda)
- Búsqueda optimizada con limpieza por categoría (libros, perfumes, electrónicos/juguetes).
- openProductPage usa búsqueda universal si no hay URL específica.
- Badges genéricos “Hasta 50% OFF”; se removieron precios numéricos.
- Tarjetas muestran “Descuentos especiales” + CTA “Ver en Sanborns →”.
- Consola limpia (sin console.log en archivos productivos).
- URLs de productos vacías en products-data.js para forzar búsqueda universal.

## Archivos incluidos
- index.html (con Enabler, 300x600)
- main.js (lógica de banner y búsqueda optimizada)
- voice.js (Web Speech API)
- gemini-api.js (procesamiento de intentos + fallback)
- dynamic-products.js (productos virtuales)
- products-data.js (catálogo base, sin precios mostrados)
- styles.css (estilos optimizados, badge genérico)
- manifest.json
- images/ (assets locales; usa placeholder remoto si falla)

## Cómo subir a CM360 / DV360
1) Zip final: `dv360/sanborns-reyes-magos-300x600-FINAL.zip`.
2) Subir como creativo HTML5 en CM360 (o DV360 si usas Hosted creative).
3) Tamaño debe ser < 200KB (verificado abajo).
4) Click-through manejado por `Enabler.exit('clickthrough', url)`.
5) SafeFrame-compatible (sin localStorage / sessionStorage).

## Troubleshooting
- Página de Sanborns vacía: el usuario debe ingresar código postal (el banner abre con `#modalPostalCode`).
- Si una categoría no existe en la DB, se generan productos virtuales y se abre búsqueda.
- Si Google bloquea el modelo Gemini por cuota, el fallback de keywords sigue funcionando.
- Si alguna imagen falla, se muestra placeholder remoto.

## Sistema Híbrido IA + Local
1. Primera opción: Gemini API (vía proxy/Worker) con timeout 3s. Mejores recomendaciones si el publisher permite fetch externo.
2. Fallback automático: búsqueda local por keywords (ProductMatcher). Siempre funcional aunque SafeFrame bloquee llamadas externas.
El usuario no nota la diferencia: siempre recibe productos.
Compatibilidad:
- SafeFrame abierto → usa Gemini.
- SafeFrame restrictivo → usa local.
- 100% funcional en ambos casos.

## API Endpoint
- En producción hosteada (ejemplo): `https://bannersanborns.pottential.site/api/gemini`
- En Pages/preview: `/api/gemini`
- En DV360 ZIP: usa fallback local (sin API externa)

## Contacto soporte
- Equipo técnico: (tu correo interno)
- Notas: Gemini requiere API key en `config.js` (no incluida en el zip).
