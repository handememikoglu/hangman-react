const WordDisplay = ({ word, guessedLetters, gameStatus, language }) => {
  return (
    <div className="flex justify-center gap-2 my-6 flex-wrap md:flex-nowrap overflow-x-auto max-w-full">
      {word.split('').map((letter, index) => {
        const isVisible = guessedLetters.includes(letter) || gameStatus === 'lost';
        
        return (
          <div 
            key={index}
            className={`relative w-8 sm:w-10 h-12 flex items-end justify-center ${isVisible ? 'text-gray-800' : 'text-transparent'}`}
            >
            <span className="text-2xl font-bold z-10">
              {letter}
            </span>
            <div className="absolute bottom-0 w-full h-1 bg-gray-400 rounded-full"></div>
            
            {isVisible && gameStatus !== 'lost' && (
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-green-500 rounded-full animate-underline"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default WordDisplay;