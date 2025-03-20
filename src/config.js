// Configuration settings for the application
const config = {
  // API endpoint for the N8N webhook
  // This is the URL to the N8N webhook endpoint
  // If you're having issues, try one of the alternative URLs below
  API_ENDPOINT: 'http://localhost:5678/webhook-test/bioforce-agent',
  
  // Alternative webhook URLs - uncomment one of these if the default doesn't work
  // API_ENDPOINT: 'http://localhost:5678/webhook/bioforce-agent',
  // API_ENDPOINT: 'http://localhost:5678/webhook-test/81c57761-074a-4d54-9147-fb287b68329c',
  // API_ENDPOINT: 'http://localhost:5678/webhook/81c57761-074a-4d54-9147-fb287b68329c',
  
  // Application name
  APP_NAME: 'Bioforce - Créateur de Scénario Pédagogique',
  
  // Application version
  APP_VERSION: '1.0.0',
};

export default config;
