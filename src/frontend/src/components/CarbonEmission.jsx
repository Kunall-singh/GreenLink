import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carbonfootprint.css';

function Carbon() {
  const [data, setData] = useState(null); // Null indicates loading state
  const [summary, setSummary] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/analyze-csv');
      console.log('Received data:', response.data);
      setData(response.data);

      // Set detailed summary initially, then concise summary after 2 seconds
      setSummary(response.data.detailedSummary);
      setTimeout(() => {
        setSummary(response.data.conciseSummary);
      }, 2000);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData('Error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getComparisonText = (comparison) => {
    switch (comparison) {
      case 'low':
        return 'Your footprint is low compared to the average for medium-sized companies.';
      case 'high':
        return 'Your footprint is high compared to the average for medium-sized companies.';
      default:
        return 'Comparison data is unavailable.';
    }
  };

  const getScoreValue = (score) => {
    switch (score) {
      case 'Excellent':
        return 9;
      case 'Good':
        return 7;
      case 'Average':
        return 5;
      case 'Poor':
        return 3;
      default:
        return 5;
    }
  };

  const scoreValue = data ? getScoreValue(data.score) : 5;
  const needleRotation = (scoreValue / 10) * 180 - 90; // Scale score to range -90 to 90

  return (
      <div className="App">
    <header className="App-header">
      <h1 className="App-title">Carbon Footprint Tracker</h1>
      {data === null ? (
        <div>Loading data...</div>
      ) : data === 'Error' ? (
        <div>Error loading data</div>
      ) : (
        <div className="content">
          <div className="cards-container">
            <div className="card-wrapper">
              <Card title="Total Carbon Footprint" content={data.totalCarbonFootprint ? `${data.totalCarbonFootprint.toFixed(2)} kg CO2e` : 'N/A'} />
            </div>
            <div className="card-wrapper">
              <Card title="Major Contributors" content={data.majorContributors ? data.majorContributors.map(c => `${c.activity}: ${c.emissions.toFixed(2)} kg CO2e`).join(', ') : 'N/A'} />
            </div>
            <div className="card-wrapper">
              <Card title="Score" content={data.score || 'N/A'} />
            </div>
          </div>
          <div className="summary-container">
            <Card title="Summary" content={summary || 'N/A'} />
          </div>
          <div className="score-container">
            <h2>Carbon Footprint Score</h2>
            <div className="speedometer">
              <svg viewBox="0 0 200 100" width="200" height="100">
                <path d="M10,90 A80,80 0 0,1 190,90" fill="none" stroke="#ddd" strokeWidth="10" />
                <path d="M10,90 A80,80 0 0,1 70,20" fill="none" stroke="red" strokeWidth="10" />
                <path d="M70,20 A80,80 0 0,1 130,20" fill="none" stroke="orange" strokeWidth="10" />
                <path d="M130,20 A80,80 0 0,1 190,90" fill="none" stroke="green" strokeWidth="10" />
                <line x1="100" y1="90" x2="100" y2="10" stroke="#000" strokeWidth="3" transform={`rotate(${needleRotation}, 100, 90)`} />
                <circle cx="100" cy="90" r="5" fill="#000" />
              </svg>
              <div className="score-value">{scoreValue} / 10</div>
            </div>
            <div className="comparison-text">
              <p>{getComparisonText(data.comparison)}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  </div>

  );
}

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

export default Carbon;
