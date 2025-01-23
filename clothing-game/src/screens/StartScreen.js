import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [placeholder, setPlaceholder] = useState('닉네임을 입력하세요');

  const handleStartGame = () => {
    if (!nickname.trim()) {
      // 닉네임이 입력되지 않은 경우 alert 표시
      alert('닉네임을 입력하세요.');
      return;
    }

    // 닉네임이 입력된 경우 게임 화면으로 이동
    navigate('/game');
  };

  const handleExplore = () => {
    navigate('/explore'); // 구경하기 경로로 이동 (예: Explore 페이지)
  };

  const handleInputFocus = () => {
    setPlaceholder(''); // 입력 필드에 포커스되면 placeholder 제거
  };

  const handleInputBlur = () => {
    if (!nickname.trim()) {
      setPlaceholder('닉네임을 입력하세요'); // 입력 필드가 비어 있을 경우 placeholder 복구
    }
  };

  return (
    <div className="start-screen">
      <h1>Welcome to the Clothing Game</h1>
      <input
        type="text"
        placeholder={placeholder}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onFocus={handleInputFocus} // 포커스 이벤트
        onBlur={handleInputBlur} // 포커스 아웃 이벤트
        className="nickname-input"
      />
       <div className="button-group">
        <button onClick={handleExplore} className="explore-button">
          구경하기
        </button>
        <button onClick={handleStartGame} className="start-game-button">
          Start Game
        </button>
      </div>
    </div>
  );
}
