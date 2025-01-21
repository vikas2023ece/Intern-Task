import React from "react";
import "./Card.css";

const Card = ({ card, draggable, onDragStart, isClue, isFaceUp, style }) => {
  return (
    <div
      className={`card ${isFaceUp ? card.suit : "face-down"} ${isClue ? "clue" : ""}`}
      draggable={isFaceUp && draggable}
      onDragStart={(e) => {
        if (isFaceUp) {
          onDragStart(e, card);
          e.dataTransfer.setData("card", JSON.stringify(card));
        }
      }}
      data-card-id={card?.id || ""}
      style={style}
    >
      {isFaceUp && card && (
        <>
          <span className="card-rank">{card.rank}</span>
          <span className="card-suit">
            {card.suit === "hearts" ? "♥️" : card.suit === "diamonds" ? "♦️" : card.suit === "clubs" ? "♣️" : "♠️"}
          </span>
        </>
      )}
    </div>
  );
};

export default Card;