import { useState } from 'react';
import { RobotAvatar } from '@/components/RobotAvatar';
import { VoiceControl } from '@/components/VoiceControl';
import { CommandDisplay } from '@/components/CommandDisplay';

interface Command {
  id: string;
  text: string;
  type: 'call' | 'sms' | 'search' | 'flashlight' | 'app';
  status: 'recognized' | 'executing' | 'completed' | 'error';
  response?: string;
  timestamp: Date;
}

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');

  const handleListeningChange = (listening: boolean) => {
    setIsListening(listening);
    if (!listening) {
      setCurrentCommand('');
    }
  };

  const handleSpeakingChange = (speaking: boolean) => {
    setIsSpeaking(speaking);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full p-4 border-b bg-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Jecob
            </h1>
            <p className="text-sm text-muted-foreground">Gujarati Voice Assistant</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Ready</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          
          {/* Voice Interface */}
          <div className="flex flex-col items-center space-y-8">
            {/* Robot Avatar */}
            <div className="text-center space-y-4">
              <RobotAvatar 
                isListening={isListening}
                isSpeaking={isSpeaking}
                size="lg"
              />
              
              {/* Welcome Message */}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">નમસ્તે!</h2>
                <p className="text-muted-foreground">
                  I'm Jecob, your Gujarati voice assistant
                </p>
                <p className="text-sm text-muted-foreground">
                  Say "જય જોબ" to wake me up
                </p>
              </div>
            </div>

            {/* Voice Controls */}
            <VoiceControl
              onListeningChange={handleListeningChange}
              onSpeakingChange={handleSpeakingChange}
              isListening={isListening}
              isSpeaking={isSpeaking}
            />
          </div>

          {/* Command Display */}
          <div className="flex justify-center">
            <CommandDisplay 
              commands={commands}
              currentCommand={currentCommand}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 border-t bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Created by{' '}
            <span className="font-medium text-foreground">Sanjay Kadegiya</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Voice assistant for Gujarati speakers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
