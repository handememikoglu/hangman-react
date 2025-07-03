import { useEffect } from 'react';

const HangmanCanvas = ({ wrongGuessCount, gameStatus }) => {
  useEffect(() => {
    if (gameStatus === 'lost') {
      const canvas = document.getElementById('hangman-canvas');
      if (canvas) {
        canvas.classList.add('animate-shake');
        setTimeout(() => {
          canvas.classList.remove('animate-shake');
        }, 1000);
      }
    }
  }, [gameStatus]);

  const isVisible = (index) => wrongGuessCount > index;

  return (
    <div className="relative">
      <svg 
        id="hangman-canvas"
        height="280" 
        width="220" 
        className="stroke-[4px] fill-none transition-all"
      >
        <line x1="20" y1="260" x2="160" y2="260" className="stroke-gray-800" />
        <line x1="50" y1="40" x2="50" y2="260" className="stroke-gray-800" />
        <line x1="50" y1="40" x2="130" y2="40" className="stroke-gray-800" />
        <line x1="130" y1="40" x2="130" y2="70" className="stroke-gray-800" />

        <g className={`transition-opacity duration-500 ${isVisible(0) ? 'opacity-100' : 'opacity-0'}`}>
          <circle cx="130" cy="90" r="20" className="stroke-purple-600" />
        </g>
        
        <g className={`transition-opacity duration-500 ${isVisible(1) ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="130" y1="110" x2="130" y2="170" className="stroke-blue-600" />
        </g>
        
        <g className={`transition-opacity duration-500 ${isVisible(2) ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="130" y1="120" x2="100" y2="150" className="stroke-blue-500" />
        </g>
        
        <g className={`transition-opacity duration-500 ${isVisible(3) ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="130" y1="120" x2="160" y2="150" className="stroke-blue-500" />
        </g>
        
        <g className={`transition-opacity duration-500 ${isVisible(4) ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="130" y1="170" x2="100" y2="200" className="stroke-blue-500" />
        </g>
        
        <g className={`transition-opacity duration-500 ${isVisible(5) ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="130" y1="170" x2="160" y2="200" className="stroke-blue-500" />
        </g>
      </svg>

      {gameStatus === 'lost' && (
        <>
          <div className="absolute top-17 left-33 -translate-x-1/2 text-xl opacity-0  animate-fall">
            x x
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 animate-flicker">
            <div className="text-9xl">☠️</div>
          </div>
        </>
      )}
    </div>
  );
};

export default HangmanCanvas;