const letters = "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ".split("");

const Keyboard = ({ onGuess, guessed, wrong, disabled }) => (
    <div className="gird grid-cols-9 gap-1 max-w-md">
        {letters.map((letter) => (
            <button key={letter} onClick={() => onGuess(letter.toLowerCase())}
            disabled={guessed.includes(letter.toLowerCase()) || wrong.includes(letter.toLowerCase()) || disabled}
            className="border px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50">
                {letter}
            </button>
        ))}
    </div>
);
export default Keyboard;