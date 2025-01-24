import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(''); // 가입 또는 로그인 모드
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  // 환경 변수로 API URL 설정
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

  const handleSignup = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력하세요.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '닉네임 저장 실패');
      }

      const data = await response.json();
      console.log('닉네임 저장 성공:', data);
      navigate('/game'); // 게임 화면으로 이동
    } catch (err) {
      console.error(err);
      setError(err.message || '서버 오류가 발생했습니다.');
    }
  };

  const handleLogin = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력하세요.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      });

      if (response.status === 404) {
        setError('가입하기를 통해 닉네임을 생성하세요.');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인 실패');
      }

      navigate('/game'); // 게임 화면으로 이동
    } catch (err) {
      console.error(err);
      setError(err.message || '서버 오류로 로그인할 수 없습니다.');
    }
  };

  return (
    <div className="start-screen">
      <h1>Welcome to the Clothing Game</h1>
      <div className="button-group">
        <button onClick={() => setMode('signup')} className="signup-button">가입하기</button>
        <button onClick={() => setMode('login')} className="login-button">로그인하기</button>
        <button onClick={() => navigate('/explore')} className="explore-button">구경하기</button>
      </div>

      {mode === 'signup' && (
        <div className="signup-form">
          <input
            type="text"
            placeholder="닉네임을 생성하세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="nickname-input"
          />
          <button onClick={handleSignup} className="start-game-button">Start Game</button>
        </div>
      )}

      {mode === 'login' && (
        <div className="login-form">
          <input
            type="text"
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="nickname-input"
          />
          <button onClick={handleLogin} className="start-game-button">Start Game</button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}