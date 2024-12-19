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

    function mouseEnterHandle() {
        if (!clicked && !image) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    }

    function clickHandler() {
        if (gameOver || clicked) return;

        setClicked(true);

        if (!mine) {
            setScore((prevValue) => (prevValue === 0 ? 25 : prevValue + 25)); // First click gives 5, subsequent clicks multiply by 5
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();

            setGoldGuessed((prev) => {
                const newGoldGuessed = prev + 1;
                if (newGoldGuessed === totalGold) {
                    handleWin();
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
