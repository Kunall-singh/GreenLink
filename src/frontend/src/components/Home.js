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
                    <h2>Company Goals</h2>
                    <p>Reduce carbon emissions by 25% over the next 5 years. Improve ESG scores by 10% annually through sustainable practices and community engagement.</p>
                </div>
                <div className="info-box">
                    <h2>Total Carbon Emissions Last Year</h2>
                    <p>Our total carbon emissions for last year were 1,500 metric tons, a 5% reduction from the previous year.</p>
                </div>
                <div className="info-box">
                    <h2>ESG Score</h2>
                    <p>Our current ESG score stands at 75/100, with significant improvements in social and governance metrics over the past year.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
