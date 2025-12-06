// Módulo de manejo de voz con Web Speech API
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
        // Verificar soporte del navegador
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('⚠️ Web Speech API no soportada en este navegador');
            this.isSupported = false;
            return;
        }
        
        this.isSupported = true;
        this.recognition = new SpeechRecognition();
        
        // Configuración para español mexicano
        this.recognition.lang = 'es-MX';
        this.recognition.continuous = false; // Una frase a la vez
        this.recognition.interimResults = false; // Solo resultados finales
        this.recognition.maxAlternatives = 1;
        
        // Event listeners
        this.recognition.onstart = () => {
            console.log('🎤 Escuchando...');
            this.isListening = true;
            if (this.onStart) this.onStart();
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const confidence = event.results[0][0].confidence;
            
            console.log('✅ Transcripción:', transcript);
            console.log('📊 Confianza:', (confidence * 100).toFixed(1) + '%');
            
            if (this.onResult) {
                this.onResult(transcript, confidence);
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('❌ Error de reconocimiento:', event.error);
            
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
            console.log('🎤 Reconocimiento finalizado');
            this.isListening = false;
            if (this.onEnd) this.onEnd();
        };
    }
    
    // Iniciar captura de voz
    start() {
        if (!this.isSupported) {
            console.error('❌ Web Speech API no disponible');
            if (this.onError) {
                this.onError('Tu navegador no soporta reconocimiento de voz. Usa el teclado.', 'not-supported');
            }
            return false;
        }
        
        if (this.isListening) {
            console.warn('⚠️ Ya está escuchando');
            return false;
        }
        
        try {
            this.recognition.start();
            return true;
        } catch (error) {
            console.error('❌ Error al iniciar:', error);
            return false;
        }
    }
    
    // Detener captura
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    // Verificar soporte
    checkSupport() {
        return this.isSupported;
    }
}

// Exportar para uso global
window.VoiceHandler = VoiceHandler;

