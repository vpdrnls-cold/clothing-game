import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ExploreScreen from './screens/ExploreScreen'; // Explore 컴포넌트 import

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/explore" element={<ExploreScreen />} /> {/* 구경하기 경로 추가 */}
    </Routes>
  );
}

export default App;
