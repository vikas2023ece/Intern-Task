import React, { useState } from "react";
import Card from "./Card";
import "./Tableau.css";

const Tableau = ({ cards, onDragStart, onDragOver, onDrop, clueCard }) => {
  const [lastMove, setLastMove] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData("card"));
    const isKing = cardData.rank === "K";

    // Check if the move is the same as the last move
    if (lastMove && lastMove.id === cardData.id && lastMove.destination === "tableau") {
      return; // Do not increase points or perform the move
    }

    // Allow drop if tableau is empty and the card is a King
    if (cards.length === 0 && isKing) {
      onDrop(e, cardData);
      setLastMove({ id: cardData.id, destination: "tableau" });
    } else if (cards.length > 0) {
      onDrop(e, cardData);
      setLastMove({ id: cardData.id, destination: "tableau" });
    }
  };

  return (
    <div className="tableau-column" onDragOver={onDragOver} onDrop={handleDrop}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          draggable={index === cards.length - 1} // Only the last card is draggable
          onDragStart={(e) => onDragStart(e, card, index)}
          isClue={clueCard && clueCard.id === card.id} // Highlight if it's a clue card
          isFaceUp={index === cards.length - 1} // Only the last card is face-up
          style={{
            "--index": index, // Dynamic index for precise stacking
          }}
        />
      ))}
    </div>
  );
};

export default Tableau;