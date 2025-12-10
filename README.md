# Banner Interactivo Sanborns - Carta a los Reyes Magos

Banner HTML5 con IA integrada para campaña navideña DV360.

## 🚀 Tech Stack
- HTML5 + Vanilla JavaScript
- Web Speech API (reconocimiento de voz)
- Gemini API (IA conversacional)
- Cloudflare Pages + Functions
- Google Studio Enabler (DV360 tracking)

## 📦 Estructura
```
/
├── index.html          # Banner principal
├── main.js             # Lógica e interacciones
├── voice.js            # Web Speech API
├── products-data.js    # 55+ productos Sanborns
├── styles.css          # Estilos y animaciones
├── images/             # Assets
└── functions/
    └── api/
        └── gemini.js   # Proxy Gemini API
```

## 🔧 Deploy a Cloudflare Pages
1. Push a GitHub
2. Cloudflare Dashboard → Pages → Connect to Git
3. Seleccionar repo
4. Build settings: None (static)
5. Environment variable: `GEMINI_API_KEY`
6. Deploy

## 🧪 Testing Local
```bash
# Usar Wrangler para simular Pages Functions
npm install -g wrangler
wrangler pages dev .
```

## 📊 Tracking Events (DV360)
- Banner Visible
- CTA Click
- Voice Used
- Message Sent
- AI Response Success
- AI Fallback to Local
- Product Click

## 🎯 Sistema Híbrido IA + Local
El banner intenta usar Gemini API primero (mejores respuestas).
Si falla o es bloqueado, usa fallback local automático.
Usuario SIEMPRE recibe productos relevantes.

## 💰 Costos
- Cloudflare Pages: Gratis (100K requests/día)
- Gemini API: Gratis (15 requests/min), después ~$0.00025/req
