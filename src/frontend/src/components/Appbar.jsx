import React from 'react';
import { Link } from 'react-router-dom';
import './AppBar.css';

const AppBar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/Logo.jpeg" alt="GreenLink Logo" className="navbar-logo" /> {/* Use the logo image */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav nav-container">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/emissions">Emissions Tracker</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marketplace">Marketplace</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/reports">Reports</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
