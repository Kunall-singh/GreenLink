import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowCircleUp } from 'react-icons/fa';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Fetch initial summary and data to display as the first message
    const fetchInitialData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/analyze-csv');
        const initialMessage = `Summary: ${response.data.summary}\nTotal Carbon Footprint: ${response.data.totalCarbonFootprint} kg CO2e\nMajor Contributors: ${response.data.majorContributors.map(contributor => `${contributor.activity}: ${contributor.emissions} kg CO2e`).join(', ')}\nComparison: ${response.data.comparison}`;
        setMessages([{ role: 'system', content: initialMessage }]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5001/api/chat', { message: input });
      const botMessage = response.data;
      setMessages([...messages, userMessage, { role: 'bot', content: botMessage.content }]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <h1 className="chat-heading mt-0">Have any doubts about the results? Ask AI✨</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'ChatGPT'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button onClick={sendMessage}><FaArrowCircleUp /></button>
      </div>
    </div>
  );
}

export default Chat;
