import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate('/');
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <h4>
          <span className="login__gray">New to Netflix? </span>
          <Link to="/signup" className="login__link">Sign up now.</Link>
        </h4>
      </form>
    </div>
  );
}

export default Login;