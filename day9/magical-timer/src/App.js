import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const focusTextBox = () => {
    inputRef.current.focus();
  };

  const startTimer = () => {
    if (timerRef.current) return; // Prevent multiple timers
    setIsTimeUp(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(10);
    setIsTimeUp(false);
  };

  return (
    <div className="app">
      <h1>Magical Timer and Input Box</h1>
      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here..."
          className="text-box"
        />
        <button onClick={focusTextBox}>Focus Box</button>
      </div>
      <div className="timer-section">
        <h2 className={isTimeUp ? 'time-up' : ''}>
          {isTimeUp ? "Time's Up!" : `${timeLeft} seconds`}
        </h2>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>
    </div>
  );
}

export default App;
