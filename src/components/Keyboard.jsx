const Keyboard = ({ onGuess, guessed, wrong, disabled, language }) => {
  const letters = language === 'tr' 
    ? "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ".split("") 
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleClick = (letter) => {
    onGuess(letter.toLowerCase());
    // Butona tıklandığında animasyon efekti
    const btn = document.getElementById(`key-${letter}`);
    if (btn) {
      btn.classList.add('animate-press');
      setTimeout(() => {
        btn.classList.remove('animate-press');
      }, 150);
    }
  };

  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-2 p-4 bg-gray-100 rounded-xl shadow-inner">
      {letters.map((letter) => {
        const isGuessed = guessed.includes(letter.toLowerCase());
        const isWrong = wrong.includes(letter.toLowerCase());
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