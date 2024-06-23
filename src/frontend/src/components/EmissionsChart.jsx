import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const EmissionsChart = ({ data, type }) => {
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [{
            label: 'CO2 Emissions (Metric Tons)',
            data: data.map(d => d.co2),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }, {
            label: 'Energy Usage (MWh)',
            data: data.map(d => d.energyUsage),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                },
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        },
        responsive: true, // Make sure this is set to true
        maintainAspectRatio: false, // Adjust this as needed to maintain aspect ratio
        aspectRatio: 2, // You can define aspect ratio here (width/height)
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Emissions Data for Last Year'
            },
        },
    };    

    const ChartComponent = type === 'line' ? Line : Bar;

    return (
        <div className="chart-wrapper">
            <ChartComponent data={chartData} options={options} />
        </div>
    );
};

export default EmissionsChart;
