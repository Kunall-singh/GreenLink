import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carbonfootprint.css';

function Carbon() {
  const [data, setData] = useState(null); // Null indicates loading state

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/analyze-csv');
      console.log('Received data:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData('Error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Carbon Footprint Tracker</h1>
        {data === null ? (
          <div>Loading data...</div>
        ) : data === 'Error' ? (
          <div>Error loading data</div>
        ) : (
          <div className="cards-container">
            <Card title="Total Carbon Footprint" content={data.totalCarbonFootprint ? `${data.totalCarbonFootprint.toFixed(2)} kg CO2e` : 'N/A'} />
            <Card title="Major Contributors" content={data.majorContributors ? data.majorContributors.map(c => `${c.activity}: ${c.emissions.toFixed(2)} kg CO2e`).join(', ') : 'N/A'} />
            <Card title="Summary" content={data.summary || 'N/A'} />
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
