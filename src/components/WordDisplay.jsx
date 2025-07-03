const WordDisplay = ({word, guessedLetters}) => (
    <div className="flex gap-2 text-xl">
        {word.split("").map((letter,index) =>(
            <span key={index} className="border-b-2 w-6 text-center">
                {guessedLetters.includes(letter) ? letter : '_'}
            </span>
        ))}
    </div>
);
export default WordDisplay;