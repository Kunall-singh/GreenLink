import React, { useState, useEffect } from 'react';
import './GridChartStyles.css';
import { fetchGridUsageData } from '../services/api';

const GridUsageHeatMap = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchGridUsageData().then(setData);
    }, []);

    const getColor = (value) => {
        if (value < 50) return {color: '#ccffcc', label: '0-50 kW'};   // Light green
        if (value < 100) return {color: '#ffff99', label: '51-100 kW'}; // Light yellow
        if (value < 150) return {color: '#ffcc99', label: '101-150 kW'}; // Light orange
        return {color: '#ff6666', label: '151-200 kW'}; // Light red
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="color-codes">
                {['0-50 kW', '51-100 kW', '101-150 kW', '151-200 kW'].map((range, index) => (
                    <div key={index} style={{
                        display: 'flex', alignItems: 'center', margin: '0 10px'
                    }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: getColor((index + 1) * 50 - 25).color,
                            margin: '0 5px'
                        }} />
                        <span>{range}</span>
                    </div>
                ))}
            </div>
            {data.map(month => (
                <div key={month.month} style={{ display: 'flex' }}>
                    <span style={{ width: 100 }}>{month.month}</span>
                    {month.times.map((time, index) => (
                        <div key={index} style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: getColor(time).color,
                            margin: '1px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '10px'
                        }}>
                            {time} kW
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};



export default GridUsageHeatMap;
