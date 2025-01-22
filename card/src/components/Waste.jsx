import React from "react";
import Card from "./Card";
import "./Waste.css";

const Waste = ({ wastePile, onDragStart }) => {
  return (
    <div className="waste">
      {wastePile.length > 0 && (
        <Card
          key={wastePile[wastePile.length - 1].id}
          card={wastePile[wastePile.length - 1]}
          draggable={true}
          onDragStart={(e) => onDragStart(e, wastePile[wastePile.length - 1])}
          isFaceUp={true}
        />
      )}
    </div>
  );
};

export default Waste;