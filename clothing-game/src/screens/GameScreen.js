import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import shirt from "../assets/shirt.png";
import pants from "../assets/pants.png";
import eyes from "../assets/eyes.png";
import hair from "../assets/hair.png";
import mannequin from "../assets/mannequin.png";
import "../styles/GameScreen.css";

export default function GameScreen() {
  const navigate = useNavigate();

  // 초기 위치 설정
  const initialPositions = {
    shirt: { x: 50, y: 400 },
    pants: { x: 150, y: 400 },
    eyes: { x: 250, y: 400 },
    hair: { x: 350, y: 400 },
  };

  const [clothingPosition, setClothingPosition] = useState(initialPositions);
  const [draggingItem, setDraggingItem] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 드래그 시작
  const handleDragStart = (event, item) => {
    const rect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    setDraggingItem(item);
    setOffset({ x: offsetX, y: offsetY });
  };

  // 드롭 이벤트 처리
  const handleDrop = (event) => {
    event.preventDefault();
    if (!draggingItem) return;

    const containerRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - containerRect.left - offset.x;
    const y = event.clientY - containerRect.top - offset.y;

    setClothingPosition((prev) => ({
      ...prev,
      [draggingItem]: { x, y },
    }));

    setDraggingItem(null);
    setOffset({ x: 0, y: 0 });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Reset 버튼 클릭 시 초기화
  const handleReset = () => {
    setClothingPosition(initialPositions);
  };

  // Save 버튼 클릭 시 상태 저장 및 이동
  const handleSave = () => {
    const container = document.querySelector(".mannequin-container");
    const rect = container.getBoundingClientRect();

    // 부모 컨테이너 기준 좌표로 조정
    const adjustedPositions = {};
    Object.keys(clothingPosition).forEach((item) => {
      adjustedPositions[item] = {
        x: clothingPosition[item].x - rect.left,
        y: clothingPosition[item].y - rect.top,
      };
    });

    navigate("/saved", { state: { clothingPosition: adjustedPositions } });
  };

  return (
    <div
      className="game-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
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
