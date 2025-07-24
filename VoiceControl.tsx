import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceControlProps {
  onListeningChange: (isListening: boolean) => void;
  onSpeakingChange: (isSpeaking: boolean) => void;
  isListening: boolean;
  isSpeaking: boolean;
}

export const VoiceControl = ({ 
  onListeningChange, 
  onSpeakingChange, 
  isListening, 
  isSpeaking 
}: VoiceControlProps) => {
  const [isWakeWordActive, setIsWakeWordActive] = useState(false);
  const { toast } = useToast();

  // Simulate wake word detection
  useEffect(() => {
    const wakePhrases = ['જય જોબ', 'jay job', 'jai job'];
    
    if (isListening && !isWakeWordActive) {
      // Simulate wake word detection after 2 seconds
      const timer = setTimeout(() => {
        setIsWakeWordActive(true);
        speakResponse('હા કહો'); // "Yes, tell me"
        toast({
          title: "Wake Word Detected",
          description: "જય જોબ - હા કહો",
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isListening, isWakeWordActive, toast]);

  const speakResponse = (text: string) => {
    onSpeakingChange(true);
    
    // Simulate speech duration
    const duration = text.length * 100 + 1000; // Rough estimate
    setTimeout(() => {
      onSpeakingChange(false);
    }, duration);

    // Use Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'gu-IN'; // Gujarati
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      
      utterance.onend = () => {
        onSpeakingChange(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    onListeningChange(true);
    setIsWakeWordActive(false);
    
    toast({
      title: "Listening...",
      description: "Say 'જય જોબ' to activate",
    });
  };

  const stopListening = () => {
    onListeningChange(false);
    setIsWakeWordActive(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main microphone button */}
      <Button
        variant="outline"
        size="lg"
        onClick={toggleListening}
        disabled={isSpeaking}
        className={`
          w-20 h-20 rounded-full p-0 border-2 transition-all duration-300
          ${isListening 
            ? 'border-voice-active bg-voice-active text-white shadow-voice animate-pulse-glow' 
            : 'border-muted-foreground hover:border-primary'
          }
          ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isListening ? (
          <Mic className="w-8 h-8" />
        ) : (
          <MicOff className="w-8 h-8" />
        )}
      </Button>

      {/* Status text */}
      <div className="text-center space-y-2">
        {isSpeaking && (
          <div className="flex items-center justify-center space-x-2 text-accent">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Speaking...</span>
          </div>
        )}
        
        {isListening && !isSpeaking && (
          <div className="text-voice-active">
            <p className="text-sm font-medium">
              {isWakeWordActive ? 'Ready for command' : 'Say "જય જોબ"'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isWakeWordActive ? 'Listening for your command' : 'Wake word detection active'}
            </p>
          </div>
        )}
        
        {!isListening && !isSpeaking && (
          <div className="text-muted-foreground">
            <p className="text-sm">Tap to start listening</p>
            <p className="text-xs">Voice assistant ready</p>
          </div>
        )}
      </div>

      {/* Quick command hints */}
      {isWakeWordActive && (
        <div className="text-center space-y-1 animate-fade-in">
          <p className="text-xs text-muted-foreground">Try saying:</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-2 py-1 bg-muted rounded-md">"Call કરો"</span>
            <span className="px-2 py-1 bg-muted rounded-md">"SMS મોકલો"</span>
            <span className="px-2 py-1 bg-muted rounded-md">"App ખોલો"</span>
          </div>
        </div>
      )}
    </div>
  );
};