// src/components/DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.category),
        datasets: [{
            label: 'CO2 Emissions Breakdown',
            data: data.map(d => d.emissions),
            backgroundColor: data.map(d => d.color),
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'CO2 Emissions Breakdown by Category'
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
