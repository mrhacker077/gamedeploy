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
    const [score, setScore] = useState(10);
    const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());

    function restartGame() {
        setGameOver(false);
        setScore(10);
        setRandomNumbers(generateRandomNumbers()); // Generate new mine positions
    }

    const items = [];
    for (let index = 1; index < 26; index++) {
        items.push(
            <Square
                key={index}
                mine={randomNumbers.includes(index)}
                setScore={setScore}
                gameOver={gameOver}
                setGameOver={setGameOver}
            />
        );
    }

    return (
        <> <h1>MINE HUNTER GAME</h1>
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
