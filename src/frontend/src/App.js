import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './components/Dashboard';
import EmissionsAndScenarioPage from './components/Emissions';
import StakeholderAndMarketplacePage from './components/StakeHolder';
import TargetsAndReportsPage from './components/Targets';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/emissions" element={<EmissionsAndScenarioPage />} />
          <Route path="/marketplace" element={<StakeholderAndMarketplacePage />} />
          <Route path="/reports" element={<TargetsAndReportsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

