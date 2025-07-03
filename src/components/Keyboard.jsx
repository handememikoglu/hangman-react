const Keyboard = ({ onGuess, guessed, wrong, disabled, language }) => {
  const letters = language === 'tr' 
    ? "A B C Ç D E F G Ğ H I İ J K L M N O Ö P Q R S Ş T U Ü V W X Y Z".split(" ") 
    : "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");

  const handleClick = (letter) => {
    onGuess(letter);
    
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
        const isGuessed = guessed.includes(letter);
        const isWrong = wrong.includes(letter);
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