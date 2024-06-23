const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/backend/uploads/')  // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)  // Prefixing the filename with a timestamp
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(cors());

// Endpoint for ChatGPT API requests
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

// File upload endpoint
app.post('/upload', upload.array('files'), (req, res) => {
  try {
    console.log('Uploaded files:', req.files);
    res.send('Files uploaded successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
