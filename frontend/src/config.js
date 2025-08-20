// Retell AI Configuration
// Replace these values with your actual Retell AI credentials

export const retellConfig = {
  // Your Retell AI Agent ID - Get this from your Retell dashboard
  agentId: 'agent_67d889ba25f2c1ff0861e66b2c',
  
  // Your Retell AI API Key (if required)
  // Get this from your Retell dashboard under API settings
  apiKey: 'key_f87794c8cf05d7beda99f37e3293',
  
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
  // In production, you might want to use environment variables
  if (process.env.NODE_ENV === 'production') {
    return {
      agentId: process.env.REACT_APP_RETELL_AGENT_ID || retellConfig.agentId,
      apiKey: process.env.REACT_APP_RETELL_API_KEY || retellConfig.apiKey,
      callOptions: retellConfig.callOptions,
      isDevelopment: false,
    };
  }
  
  return retellConfig;
};

// Helper function to validate configuration
export const validateConfig = (config) => {
  const errors = [];
  
  if (!config.agentId || config.agentId === 'YOUR_AGENT_ID') {
    errors.push('Agent ID is required. Please set your Retell AI Agent ID in config.js');
  }
  
  if (config.apiKey === 'YOUR_API_KEY') {
    console.warn('API Key not set. Some features may not work without an API key.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
