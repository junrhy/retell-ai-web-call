// Retell AI Configuration
// Replace these values with your actual Retell AI credentials

export const retellConfig = {
  // Note: Retell AI credentials are handled by the backend
  // Frontend only needs the backend URL to communicate with the API
  agentId: 'BACKEND_HANDLED',
  
  // Note: API Key is handled by the backend for security
  apiKey: 'BACKEND_HANDLED',
  
  // Optional: Custom configuration for the call
  callOptions: {
    // Enable/disable call recording
    enableRecording: false,
    
    // Custom greeting message (if supported by your agent)
    greetingMessage: 'Hello! How can I help you today?',
    
    // Call timeout in milliseconds (default: 5 minutes)
    callTimeout: 300000,
  },
  
  // Development mode - set to false for production
  isDevelopment: true,
};

// Environment-specific configurations
export const getConfig = () => {
  // Frontend doesn't need Retell credentials - backend handles everything
  return {
    agentId: retellConfig.agentId,
    apiKey: retellConfig.apiKey,
    callOptions: retellConfig.callOptions,
    isDevelopment: process.env.NODE_ENV !== 'production',
  };
};

// Helper function to validate configuration
export const validateConfig = (config) => {
  const errors = [];
  
  // Frontend doesn't need to validate Retell credentials
  // Backend handles all authentication and API calls
  console.log('Frontend config validation: Backend handles all Retell AI credentials');
  
  return {
    isValid: true,
    errors: [],
  };
};
