import React from 'react';
import './App.css';
import Auth from './components/Auth';
import User from './components/User';

const Authorized = Auth(User);

function App() {
  const user = { name: "vikas" };
  const isAuth = true;

  return (
    <div className="App">
      <Authorized isAuth={isAuth} user={user} />
    </div>
  );
}

export default App;