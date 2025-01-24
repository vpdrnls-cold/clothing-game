import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import shirt from "../assets/shirt.png";
import pants from "../assets/pants.png";
import eyes from "../assets/eyes.png";
import hair from "../assets/hair.png";
import mannequin from "../assets/mannequin.png";
import "../styles/SavedScreen.css";

export default function SavedScreen() {
  const { state } = useLocation();
  const clothingPosition = state?.clothingPosition || {};
  const captureRef = useRef();

  const handleDownload = async () => {
    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = "saved-outfit.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error capturing the image:", error);
    }
  };

  return (
    <div className="saved-screen">
      {/* Saved Outfit 문구 */}
      <h1 className="title">Saved Outfit</h1>
      {/* 마네킹 및 옷 */}
      <div ref={captureRef} className="mannequin-container">
        <img src={mannequin} alt="Mannequin" className="mannequin" />
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
          />
        ))}
      </div>
      {/* 버튼 영역 */}
      <div className="button-group">
        <button className="download-button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}
