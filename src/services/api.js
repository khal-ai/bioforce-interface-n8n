import axios from 'axios';
import config from '../config';

const apiService = {
  // Send a message to the AI agent
  sendMessage: async (message) => {
    try {
      // Format the request data according to what the N8N webhook expects
      // The webhook might expect data in a specific format
      const requestData = {
        message: message,
        // You can add additional data here if needed by the N8N workflow
        timestamp: new Date().toISOString(),
        source: 'bioforce-interface'
      };
      
      const response = await axios.post(config.API_ENDPOINT, requestData);
      console.log('N8N response:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default apiService;
