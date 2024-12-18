import './Square.css';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';
import { useEffect, useState } from 'react';

function Square({
    mine,
    setGameOver,
    gameOver,
    setScore,
    setGoldGuessed,
    totalGold,
    handleWin,
}) {
    let [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            if (mine) {
                setImage(bombIcon);
            } else {
                setImage(goldIcon);
            }
        } else {
            setImage(null); // Reset image when game restarts
        }
    }, [gameOver, mine]);

    function mouseEnterHandle() {
        if (!image) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    }

    function clickHandler() {
        if (gameOver) return;

        if (!mine) {
            setScore((prevValue) => prevValue * 2);
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();

            // Increment the number of golds guessed
            setGoldGuessed((prev) => {
                const newGoldGuessed = prev + 1;
                if (newGoldGuessed === totalGold) {
                    handleWin(); // Call win function when all golds are guessed
                }
                return newGoldGuessed;
            });
        } else {
            alert('You Lose The Game');
            setGameOver(true);
        }
    }

    return (
        <div className="square-item" onMouseEnter={mouseEnterHandle} onClick={clickHandler}>
            {image && <img height={90} width={90} src={image} alt="icon" />}
        </div>
    );
}

export default Square;
