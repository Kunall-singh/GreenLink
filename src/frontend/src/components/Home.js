import React, { useState, useEffect } from 'react';
import EmissionsChart from './EmissionsChart';
import DoughnutChart from './DoughnutChart';
import './home.css';
import { fetchYearlyEmissionsData, fetchEmissionsBreakdown } from '../services/api'; // Ensure this path is correct based on your project structure

function Home() {
    const [emissionsData, setEmissionsData] = useState([]);
    const [emissionsBreakdown, setEmissionsBreakdown] = useState([]);
    const [chartType, setChartType] = useState('line'); // Toggle between 'line' and 'bar'

    useEffect(() => {
        async function fetchData() {
            const data = await fetchYearlyEmissionsData();
            setEmissionsData(data);
            const breakdownData = await fetchEmissionsBreakdown();
            setEmissionsBreakdown(breakdownData);
        }
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <h1>Last Year's Emissions Data</h1>
            <div className="charts-container">
                <div className="chart-wrapper">
                    <EmissionsChart data={emissionsData} type={chartType} />
                </div>
                <div className="chart-wrapper">
                    <DoughnutChart data={emissionsBreakdown} />
                </div>
            </div>
            <div className="toggle-container">
                <button onClick={() => setChartType(prevType => prevType === 'line' ? 'bar' : 'line')}>
                    Toggle Chart Type
                </button>
            </div>
            <div className="additional-info">
                <div className="info-box">
                    <img src="/goals.png" alt="Company Goals" className="info-image" />
                </div>
                <div className="info-box">
                    <img src="/emissions.png" alt="Carbon Emissions & ESG Score" className="info-image" />
                </div>
            </div>

        </div>
    );
}

export default Home;
