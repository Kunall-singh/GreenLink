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
