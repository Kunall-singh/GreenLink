import React, { useState, useEffect } from 'react';
import EmissionsChart from './EmissionsChart';
import DoughnutChart from './DoughnutChart';
import GridUsageChart from './GridUsageChart';
import './home.css';
import { fetchYearlyEmissionsData, fetchEmissionsBreakdown, fetchGridUsageData, fetchWaterUsageData } from '../services/api';

function Home() {
    const [emissionsData, setEmissionsData] = useState([]);
    const [emissionsBreakdown, setEmissionsBreakdown] = useState([]);
    const [gridUsageData, setGridUsageData] = useState([]);
    const [waterUsageData, setWaterUsageData] = useState([]);
    const [chartType, setChartType] = useState('line');

    useEffect(() => {
        async function fetchData() {
            const emissions = await fetchYearlyEmissionsData();
            setEmissionsData(emissions);
            const breakdown = await fetchEmissionsBreakdown();
            setEmissionsBreakdown(breakdown);
            const gridUsage = await fetchGridUsageData();
            setGridUsageData(gridUsage);
            const waterUsage = await fetchWaterUsageData();
            setWaterUsageData(waterUsage);
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
            <div className="chart-wrapper">
                    <GridUsageChart data={gridUsageData} />
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
