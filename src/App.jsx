import { useEffect, useState } from 'react';
import './index.css'
import { wordsTR } from './data/words-tr';
import { wordsEN } from './data/words-en';
import LanguageSelector from './components/LanguageSelector';
import WordDisplay from './components/WordDisplay';
import HangmanCanvas from './components/HangmanCanvas';
import Keyboard from './components/Keyboard';

function App() {
  const [language, setLanguage] = useState('tr');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const maxAttempts = 6;

  useEffect(() => {
    startNewGame();
  }, [language]);

  const startNewGame = () => {
  const wordList = language === 'tr' ? wordsTR : wordsEN;
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  
  setWord(
    language === 'tr'
      ? randomWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('tr')
      : randomWord.toLowerCase()
  );

  setGuessedLetters([]);
  setWrongGuesses([]);
  setGameStatus('playing');
};


  const handleGuess = (letter) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter) || wrongGuesses.includes(letter)) {
      return;
    }

    if (word.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);
      
      if (word.split('').every(l => newGuessedLetters.includes(l))) {
        setGameStatus('won');
      }
    } else {
      const newWrongGuesses = [...wrongGuesses, letter];
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses.length >= maxAttempts) {
        setGameStatus('lost');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center gap-6 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            {language === 'tr' ? 'Adam Asmaca' : 'Hangman'}
          </h1>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <HangmanCanvas 
              wrongGuessCount={wrongGuesses.length} 
              gameStatus={gameStatus} 
            />
            
            <WordDisplay 
              word={word} 
              guessedLetters={guessedLetters} 
              gameStatus={gameStatus}
            />
          </div>

          <div className="flex flex-col gap-6">
            <Keyboard 
              onGuess={handleGuess} 
              guessed={guessedLetters} 
              wrong={wrongGuesses} 
              disabled={gameStatus !== 'playing'}
              language={language}
            />

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-medium text-red-600 mb-2">
                {language === 'tr' ? 'Yanlış Tahminler' : 'Wrong Guesses'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {wrongGuesses.length > 0 ? (
                  wrongGuesses.map((letter, i) => (
                    <span key={i} className="text-red-600 font-bold">
                      {letter.toUpperCase()}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">
                    {language === 'tr' ? 'Henüz yanlış tahmin yok' : 'No wrong guesses yet'}
                  </span>
                )}
              </div>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-500" 
                  style={{ width: `${(wrongGuesses.length / maxAttempts) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {(gameStatus === 'lost' || gameStatus === 'won') && (
          <div className={`mt-6 p-4 rounded-lg text-center ${gameStatus === 'won' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="text-xl font-bold mb-2">
              {gameStatus === 'won' 
                ? (language === 'tr' ? 'Tebrikler! Kazandınız! 🎉' : 'Congratulations! You won! 🎉')
                : (language === 'tr' ? `Kaybettiniz! Kelime: ${word}` : `Game over! The word was: ${word}`)}
            </p>
            <button 
              onClick={startNewGame}
              className="mt-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
            >
              {language === 'tr' ? 'Yeni Oyun' : 'New Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;