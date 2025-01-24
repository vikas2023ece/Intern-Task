import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </Link>
      <div className="header__nav">
        <Link to="/login" className="header__link">
          Sign In
        </Link>
        <Link to="/signup" className="header__link">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Header;