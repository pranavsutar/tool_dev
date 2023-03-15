import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <>
           
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
            SniffCSV
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links">
              Help
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links">
              About us
            </a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
