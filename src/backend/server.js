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
app.use('/reports', express.static(path.join(__dirname, 'uploads')));

const averageCarbonFootprintMediumCompany = 150000; // Placeholder value

let analyzedData = null; // Store the analyzed data

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
            const co2Emissions = parseFloat(item["Unit CO2 emissions (non-biogenic)"]) || 0;
            const methaneEmissions = parseFloat(item["Unit Methane (CH4) emissions"]) || 0;
            const nitrousOxideEmissions = parseFloat(item["Unit Nitrous Oxide (N2O) emissions"]) || 0;
            const biogenicCo2Emissions = parseFloat(item["Unit Biogenic CO2 emissions (metric tons)"]) || 0;

            // Assuming you want to calculate the CO2 equivalent emissions
            const methaneCO2Equivalent = methaneEmissions * 25; // 25 times more potent than CO2
            const nitrousOxideCO2Equivalent = nitrousOxideEmissions * 298; // 298 times more potent than CO2

            return acc + co2Emissions + methaneCO2Equivalent + nitrousOxideCO2Equivalent + biogenicCo2Emissions;
          }, 0);

          console.log('Total Carbon Footprint:', totalCarbonFootprint);

          const majorContributors = results
            .map(item => ({
              activity: item["Unit Type"],
              emissions: (parseFloat(item["Unit CO2 emissions (non-biogenic)"]) || 0) +
                         (parseFloat(item["Unit Methane (CH4) emissions"]) || 0) * 25 +
                         (parseFloat(item["Unit Nitrous Oxide (N2O) emissions"]) || 0) * 298 +
                         (parseFloat(item["Unit Biogenic CO2 emissions (metric tons)"]) || 0)
            }))
            .sort((a, b) => b.emissions - a.emissions)
            .slice(0, 3);

          console.log('Major Contributors:', majorContributors);

          const score = getScore(totalCarbonFootprint);

          const prompt = `Given the following data on various activities, calculate the total carbon footprint in kg CO2e (kilograms of carbon dioxide equivalent). Each activity has an associated amount and unit. Data: ${JSON.stringify(results)}. Based on this data, provide the total carbon footprint and identify the major contributors in 2-3 sentences. Additionally, give a concise summary (2-3 words) indicating whether the total carbon footprint is low, high, or average compared to the provided average carbon footprint for medium companies, which is 150,000 kg CO2e per year. Be brief and to the point.`;

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
          const detailedSummary = summaryLines.slice(0, -1).join('\n');
          const conciseSummary = summaryLines.slice(-1)[0];

          const result = {
            totalCarbonFootprint: totalCarbonFootprint || 0,
            majorContributors: majorContributors.length ? majorContributors : [{ activity: 'N/A', emissions: 0 }],
            detailedSummary,
            conciseSummary,
            comparison: totalCarbonFootprint > averageCarbonFootprintMediumCompany ? 'high' : 'low',
            score
          };

          console.log('Result:', result);

          analyzedData = result; // Store the analyzed data

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

const getScore = (carbonFootprint) => {
  if (carbonFootprint < 500) return 'Excellent';
  if (carbonFootprint < 2000) return 'Good';
  if (carbonFootprint < 5000) return 'Average';
  return 'Poor';
};

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
    if (!analyzedData) {
      return res.status(400).send('No analyzed data available. Please analyze a CSV file first.');
    }

    const prompt = `You are given the following carbon footprint analysis data:
    Total Carbon Footprint: ${analyzedData.totalCarbonFootprint} kg CO2e
    Major Contributors: ${analyzedData.majorContributors.map(contributor => `${contributor.activity}: ${contributor.emissions} kg CO2e`).join(', ')}
    Detailed Summary: ${analyzedData.detailedSummary}
    Concise Summary: ${analyzedData.conciseSummary}
    Comparison: ${analyzedData.comparison}
    Score: ${analyzedData.score}
    Based on this data, respond to the following question: ${message}`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with ChatGPT API');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
