
import { useEffect, useState } from 'react';
import './index.css'
import { wordsTR } from './data/words-tr';
import { wordsEN } from './data/words-en';
import LanguageSelector from './components/LanguageSelector';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import HangmanCanvas from './components/HangmanCanvas';

function App() {
  const [language, setLanguage] = useState('tr');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const maxAttempts = 6;

  useEffect(() => {
    const wordList = language === 'tr' ? wordsTR : wordsEN;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(randomWord.toLowerCase());
    setGuessedLetters([]);
    setWrongGuesses([]);
  },[language]);

  const handleGuess = (letter) => {
    if (isGameOver || isWin) return;
    if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)){
      return;
    }
    if(word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }else {
      setWrongGuesses([...wrongGuesses, letter]);
    }
  };

  const restartGame = () => {
  const wordList = language === 'tr' ? wordsTR : wordsEN;
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  setWord(randomWord.toLowerCase());
  setGuessedLetters([]);
  setWrongGuesses([]);
};

  const isGameOver = wrongGuesses.lenght >= maxAttempts;
  const isWin = word.split('').every(l => guessedLetters.includes(l));

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <LanguageSelector language={language} setLanguage={setLanguage}/>
      <h1 className='text-2xl font-bold'>Adam Asmaca</h1>
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard onGuess={handleGuess} guessed={guessedLetters} wrong={wrongGuesses} disabled={isGameOver || isWin} />
      <p>Hatalı: {wrongGuesses.join(', ')}</p>
      {isGameOver && <p className="text-red-500">Kaybettin! Kelime: {word}</p>}
      {isWin && <p className="text-green-500">Tebrikler! Bildin 🎉</p>}
      <HangmanCanvas wrongGuessCount={wrongGuesses.length} />
      <button onClick={restartGame} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Yeni Oyun
      </button>
    </div>
  )
}

export default App
