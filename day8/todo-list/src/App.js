import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage the list of to-dos
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle adding a new to-do
  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  // Handle deleting a to-do
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new to-do"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
