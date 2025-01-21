import React, { useState } from "react";
import shirt from "../assets/shirt.png";
import pants from "../assets/pants.png";
import eyes from "../assets/eyes.png";
import hair from "../assets/hair.png";
import mannequin from "../assets/mannequin.png";
import "../styles/GameScreen.css";

export default function GameScreen() {
  const [clothingPosition, setClothingPosition] = useState({
    shirt: { x: 50, y: 400 },
    pants: { x: 150, y: 400 },
    eyes: { x: 250, y: 400 },
    hair: { x: 350, y: 400 },
  });

  const [draggingItem, setDraggingItem] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 드래그 중 마우스와 아이템의 상대적 위치

  // 드래그 시작
  const handleDragStart = (event, item) => {
    const rect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    setDraggingItem(item);
    setOffset({ x: offsetX, y: offsetY }); // 마우스와 아이템의 상대적 위치 저장
  };

  // 드롭 이벤트 처리
  const handleDrop = (event) => {
    event.preventDefault();
    if (!draggingItem) return;

    const containerRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - containerRect.left - offset.x; // 보정값 적용
    const y = event.clientY - containerRect.top - offset.y; // 보정값 적용

    setClothingPosition((prev) => ({
      ...prev,
      [draggingItem]: { x, y },
    }));

    setDraggingItem(null); // 드래그 상태 초기화
    setOffset({ x: 0, y: 0 }); // 보정값 초기화
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="game-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="mannequin-container">
        <img src={mannequin} alt="Mannequin" className="mannequin" />
      </div>
      {Object.keys(clothingPosition).map((item) => (
        <img
          key={item}
          src={
            item === "shirt"
              ? shirt
              : item === "pants"
              ? pants
              : item === "eyes"
              ? eyes
              : hair
          }
          alt={item}
          className="item"
          style={{
            position: "absolute",
            left: `${clothingPosition[item].x}px`,
            top: `${clothingPosition[item].y}px`,
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
        />
      ))}
    </div>
  );
}
