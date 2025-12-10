# Sanborns Carta Reyes Magos - DV360 Package

Banner interactivo 300x600px compatible con Display & Video 360.

## 📦 Estructura del ZIP

```
sanborns-reyes-magos-300x600.zip
├── index.html          (Punto de entrada con Enabler)
├── styles.css          (Estilos optimizados)
├── main.js             (Lógica principal con tracking)
├── voice.js            (Web Speech API con fallback)
├── products-data.js    (Base de datos de productos)
├── manifest.json       (Metadata del banner)
└── images/
    ├── logo.png
    ├── reyes-magos.svg
    └── placeholder.png
```

## ✅ Características DV360

- ✅ Google Studio Enabler integrado
- ✅ Tracking events configurados
- ✅ Enabler.exit() para todos los clicks
- ✅ Sin localStorage/sessionStorage (SafeFrame compatible)
- ✅ Imágenes locales (no CDN externos)
- ✅ Web Speech API con fallback
- ✅ Tamaño ZIP: 46KB (< 200KB límite)

## 🎯 Tracking Events

El banner envía los siguientes eventos a DV360:

- `Banner Visible` - Cuando el banner se carga
- `Voice Used` - Cuando se usa el micrófono
- `Message Sent` - Cuando se envía un mensaje
- `Product Click` - Cuando se clickea un producto
- `CTA Click` - Click en el banner (clickthrough)

## 🚀 Cómo usar

1. **Subir a DV360:**
   - Ve a tu cuenta de DV360
   - Crea nueva creatividad HTML5
   - Sube el archivo `sanborns-reyes-magos-300x600.zip`
   - Configura el clickTag: `https://www.sanborns.com.mx/`

2. **Configurar ClickTag:**
   - El clickTag por defecto es: `https://www.sanborns.com.mx/`
   - Puedes cambiarlo en la configuración de DV360
   - Los productos individuales usan sus URLs específicas

3. **Testing:**
   - Abre `index.html` en un navegador para probar
   - Verifica que Enabler.js carga correctamente
   - Prueba todos los clicks y tracking events

## 📝 Notas Técnicas

- **Enabler.js:** Carga desde `s0.2mdn.net/ads/studio/Enabler.js`
- **SafeFrame:** Compatible, no usa localStorage
- **Web Speech API:** Funciona en Chrome/Edge, fallback a texto en otros navegadores
- **Imágenes:** Todas las imágenes de productos usan placeholder (puedes reemplazarlas)

## 🔧 Build

Para regenerar el ZIP:

```bash
cd dv360
./build.sh
```

## 📊 Tamaño

- ZIP completo: **46KB**
- Límite DV360: 200KB
- ✅ **Cumple con el límite**

## 🎨 Funcionalidades

1. **Input de texto** - Escribe deseos
2. **Reconocimiento de voz** - Habla tus deseos (Chrome/Edge)
3. **Búsqueda de productos** - Sistema inteligente de matching
4. **Tarjetas de productos** - Click para ir a Sanborns
5. **Animaciones** - Entrada suave y feedback visual

## ⚠️ Limitaciones DV360

- No puede usar APIs externas (excepto Enabler)
- No puede usar localStorage/sessionStorage
- Debe funcionar en iframe (SafeFrame)
- Tamaño máximo 200KB

## 📞 Soporte

Para problemas o preguntas sobre la implementación DV360, consulta la documentación oficial de Google Studio.

