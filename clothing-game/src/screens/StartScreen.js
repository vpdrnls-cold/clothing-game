import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  return (
    <div className="start-screen">
      <h1>Welcome to the Clothing Game</h1>
      <input 
        type="text" 
        placeholder="닉네임을 입력하세요" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
        className="nickname-input"
      />
      <button 
        onClick={() => navigate('/game')} 
        className="start-game-button">
        Start Game
      </button>
    </div>
  );
}
