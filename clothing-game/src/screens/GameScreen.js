import React, { useState } from 'react';
import shirt from '../assets/shirt.png';
import pants from '../assets/pants.png';
import eyes from '../assets/eyes.png';
import hair from '../assets/hair.png';
import mannequin from '../assets/mannequin.png';
import '../styles/GameScreen.css'; // CSS 파일 추가 (선택 사항)
import axios from 'axios';

export default function GameScreen() {
  const [clothingPosition, setClothingPosition] = useState({
    shirt: { x: 50, y: 400 },
    pants: { x: 150, y: 400 },
    eyes: { x: 250, y: 400 },
  });

  // 드래그 앤 드롭 처리
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('item', item);
  };

  const handleDrop = (event) => {
    const item = event.dataTransfer.getData('item');
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setClothingPosition((prev) => ({
      ...prev,
      [item]: { x, y },
    }));
  };

  const saveGameData = async () => {
    try {
      await axios.post('http://localhost:3001/save', clothingPosition);
      alert('Game data saved successfully!');
    } catch (error) {
      alert('Failed to save game data.');
      console.error(error);
    }
  };

  return (
    <div className="game-container" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <img src={mannequin} alt="Mannequin" className="mannequin" />
      <img
        src={shirt}
        alt="Shirt"
        className="item"
        style={{ left: clothingPosition.shirt.x, top: clothingPosition.shirt.y }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'shirt')}
      />
      <img
        src={pants}
        alt="Pants"
        className="item"
        style={{ left: clothingPosition.pants.x, top: clothingPosition.pants.y }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'pants')}
      />
      <img
        src={eyes}
        alt="Eyes"
        className="item"
        style={{ left: clothingPosition.eyes.x, top: clothingPosition.eyes.y }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'eyes')}
      />
      <img
        src={hair}
        alt="Hair"
        className="item"
        style={{ left: clothingPosition.hair.x, top: clothingPosition.hair.y }}
        draggable
        onDragStart={(e) => handleDragStart(e, 'hair')}
      />
      <button className="save-button" onClick={saveGameData}>
        Save Game
      </button>
    </div>
  );
}
