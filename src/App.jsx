import { useState } from 'react';
import './App.css';
import Square from './Square/Square';
import winSound from './assets/Sound/hover.wav'; // Add win sound import
import loseSound from './assets/Sound/hover.wav'; // Add lose sound import

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers() {
    let randomNumbers = [];
    while (randomNumbers.length < 1) {
        let randomNumber = getRandomInt(1, 25);
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

function App() {
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0); // Start score from 0
    const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());
    const [goldGuessed, setGoldGuessed] = useState(0);
    const [gameMessage, setGameMessage] = useState(''); // State to store game message

    function restartGame() {
        setGameOver(false);
        setScore(0); // Reset score to 0
        setRandomNumbers(generateRandomNumbers());
        setGoldGuessed(0);
        setGameMessage(''); // Reset message on restart
    }

    const handleWin = () => {
        const sound = new Audio(winSound);
        sound.play(); // Play win sound
        setGameMessage('Congratulations! You won the game!'); // Set win message
        setGameOver(true);
    };

    const handleLose = () => {
        const sound = new Audio(loseSound);
        sound.play(); // Play lose sound
        setGameMessage('You lose the game. Try again!'); // Set lose message
        setGameOver(true);
    };

    const items = [];
    for (let index = 1; index < 26; index++) {
        items.push(
            <Square
                key={index}
                mine={randomNumbers.includes(index)}
                setScore={setScore}
                gameOver={gameOver}
                setGameOver={setGameOver}
                setGoldGuessed={setGoldGuessed}
                totalGold={25 - randomNumbers.length}
                handleWin={handleWin}
                handleLose={handleLose} // Pass the lose handler to Square
            />
        );
    }

    return (
        <>
            <h1>MINE HUNTER GAME</h1>
            <div className="d-flex gap-10">
                <div className="totalScore">
                    <p>Total Score</p>
                    <p>{score} PTS</p>
                </div>
                <div className="d-grid">{items}</div>
            </div>
            {gameMessage && (
                <div className="game-message">
                    <p>{gameMessage}</p> {/* Display the game message */}
                </div>
            )}
            {gameOver && (
                <button className="restart-button" onClick={restartGame}>
                    Restart Game
                </button>
            )}
        </>
    );
}

export default App;
