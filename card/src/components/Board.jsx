import React, { useState, useEffect, useCallback } from "react";
import Tableau from "./Tableau";
import Foundation from "./Foundation";
import Stock from "./Stock";
import Waste from "./Waste";
import WelcomeScreen from "./WelcomeScreen";
import { createDeck } from "../utils/deck";
import { shuffleDeck } from "../utils/shuffle";
import "./Board.css";

const Board = () => {
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);
  const [tableau, setTableau] = useState([[], [], [], [], [], [], []]);
  const [foundation, setFoundation] = useState([[], [], [], []]);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [clueCard, setClueCard] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const startTime = Date.now();

  const setupGame = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    let newTableau;
    if (difficulty === "easy") {
      newTableau = [
        deck.slice(0, 1),
        deck.slice(1, 3),
        deck.slice(3, 6),
        deck.slice(6, 10),
        deck.slice(10, 15),
        deck.slice(15, 21),
        deck.slice(21, 28),
      ];
    } else if (difficulty === "medium") {
      newTableau = [
        deck.slice(0, 2),
        deck.slice(2, 5),
        deck.slice(5, 9),
        deck.slice(9, 14),
        deck.slice(14, 20),
        deck.slice(20, 27),
        deck.slice(27, 35),
      ];
    } else if (difficulty === "hard") {
      newTableau = [
        deck.slice(0, 3),
        deck.slice(3, 7),
        deck.slice(7, 12),
        deck.slice(12, 18),
        deck.slice(18, 25),
        deck.slice(25, 33),
        deck.slice(33, 42),
      ];
    }
    setTableau(newTableau);
    setStock(deck.slice(newTableau.flat().length));
    setWaste([]);
    setFoundation([[], [], [], []]);
    setScore(0);
    setHistory([]);
    setClueCard(null);
  }, [difficulty]);

  useEffect(() => {
    if (gameStarted) {
      setupGame();
    }
  }, [setupGame, gameStarted]);

  const saveHistory = () => {
    setHistory([...history, { stock, waste, tableau, foundation, score }]);
  };

  const handleStockClick = () => {
    saveHistory();
    if (stock.length > 0) {
      const newWaste = [...waste, stock[0]];
      setWaste(newWaste);
      setStock(stock.slice(1));
      setScore(score - 1);
    } else if (waste.length > 0) {
      setStock(waste.reverse());
      setWaste([]);
      setScore(score - 1);
    }
  };

  const handleDragStart = (e, card, pileIndex) => {
    if (pileIndex !== undefined) {
      // For tableau cards
      const cardIndex = tableau[pileIndex].findIndex((c) => c.id === card.id);
      const cardsToDrag = tableau[pileIndex].slice(cardIndex);
      e.dataTransfer.setData("cards", JSON.stringify(cardsToDrag));
      e.dataTransfer.setData("source", "tableau");
      e.dataTransfer.setData("pileIndex", pileIndex);
    } else {
      // For waste cards
      e.dataTransfer.setData("card", JSON.stringify(card));
      e.dataTransfer.setData("source", "waste");
    }
  };

  const canMoveToTableau = (card, tableauPile) => {
    if (tableauPile.length === 0) {
      return card.rank === "K";
    }
    const topCard = tableauPile[tableauPile.length - 1];
    const rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const isOppositeColor = (card.suit === "hearts" || card.suit === "diamonds") !== (topCard.suit === "hearts" || topCard.suit === "diamonds");
    return isOppositeColor && rankOrder.indexOf(card.rank) === rankOrder.indexOf(topCard.rank) - 1;
  };

  const handleDrop = (e, pileIndex) => {
    e.preventDefault();
    const source = e.dataTransfer.getData("source");
    const cardsData = e.dataTransfer.getData("cards");
    const cardData = e.dataTransfer.getData("card");
    const sourcePileIndex = e.dataTransfer.getData("pileIndex");

    let cards = [];
    let card = null;

    try {
      if (cardsData) {
        cards = JSON.parse(cardsData);
      }
      if (cardData) {
        card = JSON.parse(cardData);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      return;
    }

    if (source === "tableau" && cards.length) {
      // Handle dragging from tableau to tableau
      if (canMoveToTableau(cards[0], tableau[pileIndex]) || 
          (cards[0].rank === "K" && tableau[pileIndex].length === 0)) {
        saveHistory();
        const newTableau = tableau.map((pile, index) => {
          if (index === pileIndex) {
            return [...pile, ...cards];
          }
          if (index === parseInt(sourcePileIndex)) {
            return pile.filter((c) => !cards.some((card) => card.id === c.id));
          }
          return pile;
        });

        setTableau(newTableau);
        setScore(score + 5);
        checkGameEnd();
      } else {
        // Handle invalid drop
        e.dataTransfer.clearData();
      }
    } else if (source === "waste" && card) {
      // Handle dragging from waste to tableau
      if (canMoveToTableau(card, tableau[pileIndex]) || 
          (card.rank === "K" && tableau[pileIndex].length === 0)) {
        saveHistory();
        const newTableau = tableau.map((pile, index) => {
          if (index === pileIndex) {
            return [...pile, card];
          }
          return pile;
        });

        setWaste(waste.filter((c) => c.id !== card.id));
        setTableau(newTableau);
        setScore(score + 5);
        checkGameEnd();
      } else {
        // Handle invalid drop
        e.dataTransfer.clearData();
      }
    } else {
      // Handle other invalid scenarios
      e.dataTransfer.clearData();
    }
  };

  const handleFoundationDrop = (e, foundationIndex) => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData("card");
    const source = e.dataTransfer.getData("source");
    const sourcePileIndex = e.dataTransfer.getData("pileIndex");

    let card = null;

    try {
      if (cardData) {
        card = JSON.parse(cardData);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      return;
    }

    if (card) {
      const newFoundation = foundation.map((pile, index) => {
        if (index === foundationIndex) {
          return [...pile, card];
        }
        return pile;
      });

      if (source === "tableau") {
        const newTableau = tableau.map((pile, index) => {
          if (index === parseInt(sourcePileIndex)) {
            return pile.filter((c) => c.id !== card.id);
          }
          return pile;
        });
        setTableau(newTableau);
      } else if (source === "waste") {
        setWaste(waste.filter((c) => c.id !== card.id));
      }

      setFoundation(newFoundation);
      setScore(score + 10);
      checkGameEnd();
    } else {
      // Handle invalid drop
      e.dataTransfer.clearData();
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setStock(lastState.stock);
      setWaste(lastState.waste);
      setTableau(lastState.tableau);
      setFoundation(lastState.foundation);
      setScore(lastState.score);
      setHistory(history);
    }
  };

  const handleClue = () => {
    const getNextMove = () => {
      // Check for moves from waste to foundation
      if (waste.length > 0) {
        const wasteCard = waste[waste.length - 1];
        for (let i = 0; i < foundation.length; i++) {
          if (canMoveToFoundation(wasteCard, foundation[i])) {
            setClueCard(wasteCard);
            return `Move ${wasteCard.rank} of ${wasteCard.suit} from waste to foundation`;
          }
        }
      }

      // Check for moves from tableau to foundation
      for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 0) {
          const tableauCard = tableau[i][tableau[i].length - 1];
          for (let j = 0; j < foundation.length; j++) {
            if (canMoveToFoundation(tableauCard, foundation[j])) {
              setClueCard(tableauCard);
              return `Move ${tableauCard.rank} of ${tableauCard.suit} from tableau column ${i + 1} to foundation`;
            }
          }
        }
      }

      // Check for moves within tableau
      for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].length > 0) {
          const tableauCard = tableau[i][tableau[i].length - 1];
          for (let j = 0; j < tableau.length; j++) {
            if (i !== j && canMoveToTableau(tableauCard, tableau[j])) {
              setClueCard(tableauCard);
              return `Move ${tableauCard.rank} of ${tableauCard.suit} from tableau column ${i + 1} to tableau column ${j + 1}`;
            }
          }
        }
      }

      // Check for moves from waste to tableau
      if (waste.length > 0) {
        const wasteCard = waste[waste.length - 1];
        for (let i = 0; i < tableau.length; i++) {
          if (canMoveToTableau(wasteCard, tableau[i])) {
            setClueCard(wasteCard);
            return `Move ${wasteCard.rank} of ${wasteCard.suit} from waste to tableau column ${i + 1}`;
          }
        }
      }

      setClueCard(null);
      return "No moves available";
    };

    const canMoveToFoundation = (card, foundationPile) => {
      if (foundationPile.length === 0) {
        return card.rank === "A";
      }
      const topCard = foundationPile[foundationPile.length - 1];
      const rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      return card.suit === topCard.suit && rankOrder.indexOf(card.rank) === rankOrder.indexOf(topCard.rank) + 1;
    };
  
    const nextMove = getNextMove();
    alert(nextMove);
  };

  const calculateBonusPoints = () => {
    const endTime = Date.now();
    const gameTimeInSeconds = Math.ceil((endTime - startTime) / 1000);
    return Math.floor(700000 / gameTimeInSeconds);
  };

  const checkGameEnd = () => {
    if (foundation.every(pile => pile.length === 13)) {
      const bonusPoints = calculateBonusPoints();
      setScore(prevScore => prevScore + bonusPoints);
      alert(`Game over! Your final score is ${score + bonusPoints}`);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBack = () => {
    setGameStarted(false);
  };

  return (
    <div className="board">
      {!gameStarted ? (
        <WelcomeScreen onStartGame={handleStartGame} difficulty={difficulty} setDifficulty={setDifficulty} onBack={handleBack} />
      ) : (
        <>
          <div className="score">
            <h2>Score: {score}</h2>
            <button onClick={handleUndo}>Undo</button>
            <button onClick={handleClue}>Clue</button>
          </div>
          <div className="difficulty">
            <label htmlFor="difficulty">Difficulty: </label>
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="foundations">
            {foundation.map((pile, index) => (
              <Foundation key={index} cards={pile} onDrop={(e) => handleFoundationDrop(e, index)} onDragOver={(e) => e.preventDefault()} />
            ))}
          </div>
          <div className="stock-waste">
            <Stock cards={stock} onClick={handleStockClick} />
            <Waste wastePile={waste} onDragStart={(e, card) => {
              e.dataTransfer.setData("source", "waste");
              e.dataTransfer.setData("card", JSON.stringify(card));
            }} />
          </div>
          <div className="tableau">
            {tableau.map((pile, index) => (
              <div className="tableau-column" key={index}>
                <Tableau
                  cards={pile}
                  onDragStart={(e, card) => handleDragStart(e, card, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  clueCard={clueCard}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Board;