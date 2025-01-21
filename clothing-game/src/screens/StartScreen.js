import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="start-screen">
      <h1>Welcome to the Clothing Game</h1>
      <button onClick={() => navigate('/game')}>Start Game</button>
    </div>
  );
}
