import axios from 'axios';
import config from '../config';

const apiService = {
  // Send a message to the AI agent
  sendMessage: async (message) => {
    try {
      const response = await axios.post(config.API_ENDPOINT, { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default apiService;
