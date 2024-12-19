import './Square.css';
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
    handleLose, // Add handleLose prop
}) {
    const [clicked, setClicked] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            if (mine) {
                setImage(bombIcon);
            } else {
                setImage(goldIcon);
            }
        } else {
            setImage(null); // Reset image when game restarts
            setClicked(false);
        }
    }, [gameOver, mine]);

    function clickHandler() {
        if (gameOver || clicked) return;

        setClicked(true);

        if (!mine) {
            setScore((prevValue) => (prevValue === 0 ? 25 : prevValue + 25)); // First click gives 5, subsequent clicks multiply by 5
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play(); // Play sound after user clicks

            setGoldGuessed((prev) => {
                const newGoldGuessed = prev + 1;
                if (newGoldGuessed === totalGold) {
                    handleWin();
                }
                return newGoldGuessed;
            });
        } else {
            handleLose(); // Call handleLose instead of alert
        }
    }

    return (
        <div className="square-item" onClick={clickHandler}>
            {image && <img height={90} width={90} src={image} alt="icon" />}
        </div>
    );
}

export default Square;
