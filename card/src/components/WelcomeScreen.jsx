import React from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onStartGame, difficulty, setDifficulty, onBack }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to the Card Game</h1>
      <div className="difficulty-selection">
        <label htmlFor="difficulty">Select Game Type: </label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="buttons">
        <button onClick={onStartGame}>Start Game</button>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;