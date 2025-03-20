import axios from 'axios';
import config from '../config';

const apiService = {
  // Send a message to the AI agent
  sendMessage: async (message) => {
    try {
      console.log('Sending message to N8N webhook:', message);
      console.log('Webhook URL:', config.API_ENDPOINT);
      
      // Format the request data according to what the N8N webhook expects
      // The webhook might expect data in a specific format
      const requestData = {
        message: message
      };
      
      // Configure axios with appropriate headers
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      
      console.log('Request data:', requestData);
      
      // Make the API call
      const response = await axios.post(config.API_ENDPOINT, requestData, axiosConfig);
      
      console.log('N8N response status:', response.status);
      console.log('N8N response data:', response.data);
      
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error config:', error.config);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      }
      throw error;
    }
  },
};

export default apiService;
