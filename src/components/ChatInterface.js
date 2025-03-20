import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Spinner, Image, Row, Col } from 'react-bootstrap';
import { FaPaperPlane, FaGoogleDrive } from 'react-icons/fa';
import bioforceLogoSvg from '../assets/bioforce-logo.svg';
import ChatMessage from './ChatMessage';
import apiService from '../services/api';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour, je suis Bioforce Agent, créateur de scénario. Comment puis-je vous aider à élaborer un scénario pédagogique aujourd'hui ?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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
      // The N8N webhook response might be structured differently
      // Check for different possible response structures
      const responseText = response.data?.data || response.data?.output || response.data;
      setMessages(prevMessages => [
        ...prevMessages,
        { text: typeof responseText === 'string' ? responseText : JSON.stringify(responseText), isUser: false }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        config: error.config
      });

      const errorMessage = `Désolé, j'ai rencontré une erreur lors du traitement de votre demande. Erreur: ${error.message}${error.response ? ` (${error.response.status}: ${error.response.statusText})` : ''}`;

      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: errorMessage,
          isUser: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle downloading the latest AI message
  const handleDownload = async () => {
    // Get the latest non-user message (AI message)
    const latestAIMessage = [...messages].reverse().find(msg => !msg.isUser);

    if (!latestAIMessage) {
      console.error('No AI message found to download');
      return;
    }

    setIsDownloading(true);

    try {
      await apiService.downloadMessage(latestAIMessage.text);
    } catch (error) {
      console.error('Error downloading message:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Container className="chat-container">
      <div className="chat-header">
        <div className="logo-container">
          <Image src={bioforceLogoSvg} alt="Bioforce Logo" className="bioforce-logo" />
        </div>
        <Row>
          <Col>
            <h1>Bioforce - Créateur de Scénario Pédagogique</h1>
            <p>Discutez avec l'agent pour élaborer votre scénario pédagogique</p>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button
              variant="outline-danger"
              onClick={handleDownload}
              disabled={isDownloading || messages.length <= 1}
              className="download-button"
              title="Télécharger le dernier scénario"
            >
              {isDownloading ? (
                <>
                  <Spinner animation="border" size="sm" /> Sauvegarde en cours
                </>
              ) : (
                <>
                  <FaGoogleDrive /> Sauvegarder
                </>
              )}
            </Button>
          </Col>
        </Row>
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
            <Spinner animation="border" variant="danger" size="sm" style={{ color: 'var(--bioforce-primary)' }} />
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
            variant="danger"
            type="submit"
            className="send-button"
            style={{ backgroundColor: 'var(--bioforce-primary)', borderColor: 'var(--bioforce-primary)' }}
            disabled={isLoading || !inputMessage.trim()}
          >
            <FaPaperPlane style={{ color: 'white', fill: 'white' }} size={16} />
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ChatInterface;
