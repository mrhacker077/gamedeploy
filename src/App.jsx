import { useState } from 'react';
import './App.css';
import Square from './Square/Square';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers() {
    let randomNumbers = [];
    while (randomNumbers.length < 3) {
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

    function restartGame() {
        setGameOver(false);
        setScore(0); // Reset score to 0
        setRandomNumbers(generateRandomNumbers());
        setGoldGuessed(0);
    }

    const handleWin = () => {
        alert('Congratulations! You won the game!');
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
            {gameOver && (
                <button className="restart-button" onClick={restartGame}>
                    Restart Game
                </button>
            )}
        </>
    );
}

export default App;
