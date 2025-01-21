import React from 'react';

export default function StartScreen() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to the Clothing Game</h1>
      <button onClick={() => (window.location.href = '/game')}>Start Game</button>
    </div>
  );
}
