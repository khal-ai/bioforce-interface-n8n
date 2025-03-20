import React from 'react';
import { Container } from 'react-bootstrap';
import ChatInterface from './components/ChatInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <ChatInterface />
      </Container>
    </div>
  );
}

export default App;
