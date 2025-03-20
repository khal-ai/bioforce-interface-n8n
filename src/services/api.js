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

  // Download the latest AI message
  downloadMessage: async (message) => {
    try {
      console.log('Downloading message:', message);
      
      const downloadEndpoint = 'http://localhost:5678/webhook-test/download-conversation';
      console.log('Download endpoint:', downloadEndpoint);
      
      // Format the request data
      const requestData = {
        message: message
      };
      
      // Configure axios with appropriate headers
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        responseType: 'blob' // Important for handling file downloads
      };
      
      console.log('Download request data:', requestData);
      
      // Make the API call
      const response = await axios.post(downloadEndpoint, requestData, axiosConfig);
      
      console.log('Download response status:', response.status);
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'scenario-pedagogique.pdf';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return response;
    } catch (error) {
      console.error('Error downloading message:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      }
      throw error;
    }
  },
};

export default apiService;
