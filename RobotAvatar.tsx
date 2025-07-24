import { useState, useEffect } from 'react';
import robotImage from '@/assets/robot-avatar.png';

interface RobotAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RobotAvatar = ({ isListening = false, isSpeaking = false, size = 'lg' }: RobotAvatarProps) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const glowClasses = {
    sm: 'shadow-md',
    md: 'shadow-lg',
    lg: 'shadow-robot'
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect when listening */}
      {isListening && (
        <div className={`absolute ${sizeClasses[size]} rounded-full bg-voice-active/20 animate-pulse-glow`} />
      )}
      
      {/* Robot Avatar */}
      <div className={`
        ${sizeClasses[size]} 
        ${glowClasses[size]}
        relative rounded-full bg-gradient-primary p-2 
        transition-all duration-300 ease-in-out
        ${isSpeaking ? 'animate-bounce-soft' : ''}
        ${isListening ? 'scale-110' : ''}
      `}>
        <img 
          src={robotImage} 
          alt="Jecob Robot Avatar" 
          className="w-full h-full object-cover rounded-full"
        />
        
        {/* Eyes overlay for blinking effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            w-6 h-6 bg-background rounded-full transition-transform duration-200
            ${isBlinking ? 'scale-y-0' : 'scale-y-100'}
          `} style={{ 
            left: '30%', 
            top: '35%', 
            position: 'absolute',
            transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)'
          }} />
          <div className={`
            w-6 h-6 bg-background rounded-full transition-transform duration-200
            ${isBlinking ? 'scale-y-0' : 'scale-y-100'}
          `} style={{ 
            right: '30%', 
            top: '35%', 
            position: 'absolute',
            transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)'
          }} />
        </div>
      </div>

      {/* Voice level indicator */}
      {isListening && (
        <div className="absolute -bottom-4 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`
                w-1 bg-voice-active rounded-full transition-all duration-300
                ${i % 2 === 0 ? 'h-2 animate-pulse' : 'h-1'}
              `}
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};