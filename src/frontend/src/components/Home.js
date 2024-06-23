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
            const yearlyData = await fetchYearlyEmissionsData();
            setEmissionsData(yearlyData);
            const breakdownData = await fetchEmissionsBreakdown();
            setEmissionsBreakdown(breakdownData);
        }
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <h1>Last Year's Emissions Data</h1>
            <EmissionsChart data={emissionsData} type={chartType} />
            <button onClick={() => setChartType(prevType => prevType === 'line' ? 'bar' : 'line')}>
                Toggle Chart Type
            </button>
            <div className="doughnut-chart-container">
                <DoughnutChart data={emissionsBreakdown} />
            </div>
        </div>
    );
}

export default Home;
