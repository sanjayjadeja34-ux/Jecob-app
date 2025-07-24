import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Search, Flashlight, Smartphone } from 'lucide-react';

interface Command {
  id: string;
  text: string;
  type: 'call' | 'sms' | 'search' | 'flashlight' | 'app';
  status: 'recognized' | 'executing' | 'completed' | 'error';
  response?: string;
  timestamp: Date;
}

interface CommandDisplayProps {
  commands: Command[];
  currentCommand?: string;
}

export const CommandDisplay = ({ commands, currentCommand }: CommandDisplayProps) => {
  const getCommandIcon = (type: Command['type']) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'search':
        return <Search className="w-4 h-4" />;
      case 'flashlight':
        return <Flashlight className="w-4 h-4" />;
      case 'app':
        return <Smartphone className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Command['status']) => {
    switch (status) {
      case 'recognized':
        return 'bg-muted text-muted-foreground';
      case 'executing':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Command['status']) => {
    switch (status) {
      case 'recognized':
        return 'Recognized';
      case 'executing':
        return 'Executing';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Current listening text */}
      {currentCommand && (
        <Card className="p-4 border-voice-active bg-voice-active/5">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-voice-active rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Listening:</span>
          </div>
          <p className="text-lg font-medium mt-1">{currentCommand}</p>
        </Card>
      )}

      {/* Command history */}
      {commands.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Recent Commands</h3>
          {commands.slice(-3).reverse().map((command) => (
            <Card key={command.id} className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-0.5">
                    {getCommandIcon(command.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{command.text}</p>
                    {command.response && (
                      <p className="text-xs text-muted-foreground mt-1">{command.response}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {command.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(command.status)}`}>
                  {getStatusText(command.status)}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Available commands help */}
      {commands.length === 0 && !currentCommand && (
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-3">Available Commands</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3" />
              <span>"કોલ કરો [name]" - Make a phone call</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-3 h-3" />
              <span>"મેસેજ મોકલો [name]" - Send SMS</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-3 h-3" />
              <span>"સર્ચ કરો [query]" - Google search</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flashlight className="w-3 h-3" />
              <span>"ફ્લેશલાઇટ ચાલુ/બંધ" - Toggle flashlight</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-3 h-3" />
              <span>"[app name] ખોલો" - Open app</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};