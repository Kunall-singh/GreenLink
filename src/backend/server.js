const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

const emissionFactors = {
  Electricity: 0.233,
  'Natural Gas': 5.3,
  'Car Travel': 0.257,
  'Public Transit': 0.089,
  Flights: 0.133,
  Waste: 0.03,
  Water: 0.001,
};

const analyzeFile = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({
        mapHeaders: ({ header, index }) => header.trim()
      }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        console.log('CSV parsing complete:', results);
        try {
          const totalCarbonFootprint = results.reduce((acc, item) => {
            const factor = emissionFactors[item.Activity];
            const amount = parseFloat(item.Amount);
            return acc + (factor * amount);
          }, 0);

          console.log('Total Carbon Footprint:', totalCarbonFootprint);

          const majorContributors = results
            .map(item => ({
              activity: item.Activity,
              emissions: parseFloat(item.Amount) * emissionFactors[item.Activity]
            }))
            .sort((a, b) => b.emissions - a.emissions)
            .slice(0, 3);

          console.log('Major Contributors:', majorContributors);

          const prompt = `Given the following data on various activities, calculate the total carbon footprint in kg CO2e (kilograms of carbon dioxide equivalent). Each activity has an associated amount and unit. Use the following emission factors for your calculations:
          - Electricity: 0.233 kg CO2e per kWh
          - Natural Gas: 5.3 kg CO2e per therm
          - Car Travel: 0.257 kg CO2e per mile
          - Public Transit: 0.089 kg CO2e per mile
          - Flights: 0.133 kg CO2e per mile
          - Waste: 0.03 kg CO2e per pound
          - Water: 0.001 kg CO2e per gallon
          Data: ${JSON.stringify(results)}
          Based on this data, provide the total carbon footprint and identify the major contributors in 2-3 sentences. Additionally, give a concise summary (2-3 words) indicating whether the total carbon footprint is low, high, or average compared to other medium companies.`;

          const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
          }, {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('API response:', response.data);

          const content = response.data.choices[0]?.message?.content;
          if (!content) {
            throw new Error('No content in API response');
          }

          const summaryLines = content.trim().split('\n');
          const summary = summaryLines.slice(-1)[0];

          const result = {
            totalCarbonFootprint: totalCarbonFootprint || 0,
            majorContributors: majorContributors.length ? majorContributors : [{ activity: 'N/A', emissions: 0 }],
            summary
          };

          console.log('Result:', result);

          resolve(result);
        } catch (error) {
          console.error('Error analyzing file:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
};

// Route to analyze the CSV file
app.post('/api/analyze-csv', async (req, res) => {
  const filePath = './uploads/test.csv';

  try {
    const data = await analyzeFile(filePath);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error calculating carbon footprint score');
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with ChatGPT API');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
