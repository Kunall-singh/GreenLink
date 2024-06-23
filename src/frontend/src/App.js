import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/Appbar';
import DashboardPage from './components/Dashboard';
import EmissionsAndScenarioPage from './components/Emissions';
import StakeholderAndMarketplacePage from './components/StakeHolder';
import TargetsAndReportsPage from './components/Targets';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <AppBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/emissions" element={<EmissionsAndScenarioPage />} />
          <Route path="/marketplace" element={<StakeholderAndMarketplacePage />} />
          <Route path="/reports" element={<TargetsAndReportsPage />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

