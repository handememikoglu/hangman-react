const WordDisplay = ({ word, guessedLetters, gameStatus, language }) => {
  // Normalize based on language
  const normalizeLetter = (letter) => 
    language === 'tr' ? letter.toLowerCase('tr-TR') : letter.toLowerCase();

  const normalizedWord = language === 'tr' 
    ? word.toLowerCase('tr-TR') 
    : word.toLowerCase();
  
  const normalizedGuessedLetters = guessedLetters.map(letter => 
    language === 'tr' ? letter.toLowerCase('tr-TR') : letter.toLowerCase()
  );

  return (
    <div className="flex justify-center gap-2 my-6 flex-wrap">
      {normalizedWord.split('').map((letter, index) => {
        const isVisible = normalizedGuessedLetters.includes(letter) || gameStatus === 'lost';
        
        return (
          <div 
            key={index} 
            className={`relative w-10 h-12 flex items-end justify-center ${isVisible ? 'text-gray-800' : 'text-transparent'}`}
          >
            <span className="text-2xl font-bold z-10">
              {language === 'tr' 
                ? letter.toLocaleUpperCase('tr-TR') 
                : letter.toUpperCase()}
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