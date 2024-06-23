// src/components/Chat.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5001/api/chat', { message: input }); // Update port number here
      const botMessage = response.data.choices[0].message;
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
    }

    setInput('');
  };

  return (
    <Container>
      <h1 className="mt-5">Chat with ChatGPT</h1>
      <ListGroup className="mb-3">
        {messages.map((msg, index) => (
          <ListGroup.Item key={index} variant={msg.role === 'user' ? 'primary' : 'secondary'}>
            <strong>{msg.role === 'user' ? 'You' : 'ChatGPT'}:</strong> {msg.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={sendMessage}>Send</Button>
    </Container>
  );
}

export default Chat;
