// Módulo de manejo de voz con Web Speech API (DV360 compatible)
class VoiceHandler {
    constructor() {
        this.recognition = null;
        this.isSupported = false;
        this.isListening = false;
        this.onResult = null;
        this.onError = null;
        this.onStart = null;
        this.onEnd = null;
        this.initRecognition();
    }
    
    initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            this.isSupported = false;
            return;
        }
        
        this.isSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'es-MX';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        
        this.recognition.onstart = () => {
            this.isListening = true;
            if (this.onStart) this.onStart();
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const confidence = event.results[0][0].confidence;
            if (this.onResult) {
                this.onResult(transcript, confidence);
            }
        };
        
        this.recognition.onerror = (event) => {
            let errorMessage = 'Error al capturar voz';
            switch(event.error) {
                case 'no-speech':
                    errorMessage = 'No se detectó voz. Intenta de nuevo.';
                    break;
                case 'audio-capture':
                    errorMessage = 'No se pudo acceder al micrófono.';
                    break;
                case 'not-allowed':
                    errorMessage = 'Permiso de micrófono denegado.';
                    break;
                case 'network':
                    errorMessage = 'Error de conexión. Verifica tu internet.';
                    break;
            }
            if (this.onError) {
                this.onError(errorMessage, event.error);
            }
            this.isListening = false;
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            if (this.onEnd) this.onEnd();
        };
    }
    
    start() {
        if (!this.isSupported) {
            if (this.onError) {
                this.onError('Tu navegador no soporta reconocimiento de voz. Usa el teclado.', 'not-supported');
            }
            return false;
        }
        
        if (this.isListening) {
            return false;
        }
        
        try {
            this.recognition.start();
            return true;
        } catch (error) {
            return false;
        }
    }
    
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    checkSupport() {
        return this.isSupported;
    }
}

window.VoiceHandler = VoiceHandler;

