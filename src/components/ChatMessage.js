import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUser, FaRobot } from 'react-icons/fa';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser }) => {
  return (
    <Card className={`chat-message ${isUser ? 'user-message' : 'agent-message'}`}>
      <Card.Body>
        <div className="message-header">
          {isUser ? (
            <><FaUser className="message-icon" /> <span>Vous</span></>
          ) : (
            <><FaRobot className="message-icon" /> <span>Bioforce Agent</span></>
          )}
        </div>
        <div className="message-content">
          {message.split('\n').map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChatMessage;
