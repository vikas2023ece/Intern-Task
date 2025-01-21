import React from "react";
import "./Stock.css";

const Stock = ({ cards, onClick }) => {
  return (
    <div className="stock" onClick={onClick}>
      {cards.length > 0 ? <div className="card-back" /> : <div className="placeholder" />}
    </div>
  );
};

export default Stock;