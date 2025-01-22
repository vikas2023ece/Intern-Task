import React from "react";
import Card from "./Card";
import "./Foundation.css";

const Foundation = ({ cards, onDrop, onDragOver }) => {
  const canDrop = (card) => {
    if (cards.length === 0) {
      return card.rank === "A";
    }
    const topCard = cards[cards.length - 1];
    const rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    return card.suit === topCard.suit && rankOrder.indexOf(card.rank) === rankOrder.indexOf(topCard.rank) + 1;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const card = JSON.parse(e.dataTransfer.getData("card"));
    if (canDrop(card)) {
      onDrop(e);
    }
  };

  return (
    <div className="foundation" onDragOver={onDragOver} onDrop={handleDrop}>
      {cards.length > 0 && (
        <Card
          key={cards[cards.length - 1].id}
          card={cards[cards.length - 1]}
          draggable={true}
          onDragStart={(e) => e.dataTransfer.setData("card", JSON.stringify(cards[cards.length - 1]))}
          isFaceUp={true}
        />
      )}
    </div>
  );
};

export default Foundation;