const Keyboard = ({ onGuess, guessed, wrong, disabled, language }) => {
  const letters = language === 'tr' 
    ? "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ".split("") 
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleClick = (letter) => {
    // Convert based on language
    const guessedLetter = language === 'tr' 
      ? letter.toLocaleLowerCase('tr-TR') 
      : letter.toLowerCase();
    onGuess(guessedLetter);
    
    const btn = document.getElementById(`key-${letter}`);
    if (btn) {
      btn.classList.add('animate-press');
      setTimeout(() => {
        btn.classList.remove('animate-press');
      }, 150);
    }
  };

  // Normalize guessed and wrong letters for comparison
  const normalizeForComparison = (letter) => 
    language === 'tr' 
      ? letter.toLocaleUpperCase('tr-TR') 
      : letter.toUpperCase();

  const normalizedGuessed = guessed.map(normalizeForComparison);
  const normalizedWrong = wrong.map(normalizeForComparison);

  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-2 p-4 bg-gray-100 rounded-xl shadow-inner">
      {letters.map((letter) => {
        const normalizedLetter = normalizeForComparison(letter);
        const isGuessed = normalizedGuessed.includes(normalizedLetter);
        const isWrong = normalizedWrong.includes(normalizedLetter);
        let btnClass = "key-btn";
        
        if (isGuessed) btnClass += " bg-green-500 text-white shadow-green";
        else if (isWrong) btnClass += " bg-red-500 text-white shadow-red";
        else if (!disabled) btnClass += " bg-white hover:bg-gray-200 shadow-key";

        return (
          <button
            id={`key-${letter}`}
            key={letter}
            onClick={() => handleClick(letter)}
            disabled={isGuessed || isWrong || disabled}
            className={btnClass}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};
export default Keyboard;    