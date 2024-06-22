import React from 'react';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" style={{ borderRadius: '20px', border: '2px solid skyblue', marginTop: '20px' }}>
      <div className="container-fluid justify-content-center">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ border: '2px solid skyblue', borderRadius: '15px', padding: '5px 10px', margin: '5px', backgroundColor: '#f0f8ff' }}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/emissions-scenario" style={{ border: '2px solid skyblue', borderRadius: '15px', padding: '5px 10px', margin: '5px', backgroundColor: '#f0f8ff' }}>Emissions & Scenario</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stakeholder-marketplace" style={{ border: '2px solid skyblue', borderRadius: '15px', padding: '5px 10px', margin: '5px', backgroundColor: '#f0f8ff' }}>Stakeholder & Marketplace</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/targets-reports" style={{ border: '2px solid skyblue', borderRadius: '15px', padding: '5px 10px', margin: '5px', backgroundColor: '#f0f8ff' }}>Targets & Reports</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
