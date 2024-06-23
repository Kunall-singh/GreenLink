// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

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
