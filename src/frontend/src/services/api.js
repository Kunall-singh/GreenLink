// src/services/api.js
export const fetchYearlyEmissionsData = async () => {
    return [
        { date: '2023-01', co2: 300, energyUsage: 200, department: 'Manufacturing' },
        { date: '2023-02', co2: 150, energyUsage: 100, department: 'IT' },
        { date: '2023-03', co2: 180, energyUsage: 120, department: 'Logistics' },
        // More monthly data as needed
    ];
};

export const fetchEmissionsBreakdown = async () => {
    return [
        { category: 'Manufacturing', emissions: 1200, color: '#FF6384' },
        { category: 'IT', emissions: 800, color: '#36A2EB' },
        { category: 'Logistics', emissions: 950, color: '#FFCE56' },
        { category: 'Administration', emissions: 400, color: '#4BC0C0' },
        // Add more categories as needed
    ];
};

export const fetchGridUsageData = async () => {
    return [
        { month: 'Jan', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100 + 12)) },
        { month: 'Feb', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 300 + 12)) },
        { month: 'Mar', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 200 + 12)) },
        { month: 'Apr', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 210 + 12)) },
        { month: 'May', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 320 + 12)) },
        { month: 'Jun', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 522 + 12)) },
        { month: 'Jul', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 150 + 12)) },
        { month: 'Aug', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 175 + 12)) },
        { month: 'Sep', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 335 + 12)) },
        { month: 'Oct', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 134 + 12)) },
        { month: 'Nov', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 245 + 12)) },
        { month: 'Dec', times: Array.from({ length: 24 }, () => Math.floor(Math.random() * 265 + 12)) },
        // More months...
    ];
};

export const fetchWaterUsageData = async () => {
    return [
        { month: 'January', usage: 120 },
        { month: 'February', usage: 110 },
        { month: 'March', usage: 115 },
        { month: 'April', usage: 130 },
        { month: 'May', usage: 140 },
        { month: 'June', usage: 135 },
        // More monthly data as needed
    ];
};