import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import apiService from '../services/api';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour, je suis Bioforce Agent, créateur de scénario. Comment puis-je vous aider à élaborer un scénario pédagogique aujourd'hui ?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = inputMessage.trim();
    setMessages([...messages, { text: userMessage, isUser: true }]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await apiService.sendMessage(userMessage);
      
      // Add agent response to chat
      setMessages(prevMessages => [
        ...prevMessages, 
        { text: response.data, isUser: false }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          text: "Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Veuillez réessayer.", 
          isUser: false 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="chat-container">
      <div className="chat-header">
        <h1>Bioforce - Créateur de Scénario Pédagogique</h1>
        <p>Discutez avec l'agent pour élaborer votre scénario pédagogique</p>
      </div>
      
      <div className="messages-container">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message.text} 
            isUser={message.isUser} 
          />
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <Spinner animation="border" variant="primary" size="sm" />
            <span>L'agent réfléchit...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <Form onSubmit={handleSubmit} className="message-form">
        <Form.Group className="message-input-container">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Tapez votre message ici..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            variant="primary" 
            type="submit" 
            className="send-button"
            disabled={isLoading || !inputMessage.trim()}
          >
            <FaPaperPlane />
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ChatInterface;
