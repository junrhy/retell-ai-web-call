const express = require('express');
const cors = require('cors');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://retell-ai-frontend.onrender.com', 'https://your-custom-domain.com']
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Retell AI configuration
const RETELL_API_KEY = process.env.RETELL_API_KEY || 'key_f87794c8cf05d7beda99f37e3293';
const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID || 'agent_67d889ba25f2c1ff0861e66b2c';

// Endpoint to create web call and get access token
app.post('/api/create-web-call', async (req, res) => {
  try {
    console.log('Creating web call for agent:', RETELL_AGENT_ID);
    
    const postData = JSON.stringify({
      agent_id: RETELL_AGENT_ID
    });

    const options = {
      hostname: 'api.retellai.com',
      port: 443,
      path: '/v2/create-web-call',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'RetellAI-Webcall-Integration/1.0'
      }
    };

    const makeRequest = () => {
      return new Promise((resolve, reject) => {
                 const req = https.request(options, (response) => {
           let data = '';
           
           response.on('data', (chunk) => {
             data += chunk;
           });
           
           response.on('end', () => {
             if (response.statusCode >= 200 && response.statusCode < 300) {
               try {
                 const jsonData = JSON.parse(data);
                 resolve({ statusCode: response.statusCode, data: jsonData });
               } catch (error) {
                 reject(new Error('Invalid JSON response'));
               }
             } else {
               reject(new Error(`HTTP ${response.statusCode}: ${data}`));
             }
           });
         });

        req.on('error', (error) => {
          reject(error);
        });

        req.write(postData);
        req.end();
      });
    };

    const result = await makeRequest();
    const data = result.data;
    console.log('Web call created successfully:', data.call_id);
    
    res.json({
      success: true,
      access_token: data.access_token,
      call_id: data.call_id
    });
  } catch (error) {
    console.error('Error creating web call:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    retell_agent_id: RETELL_AGENT_ID,
    api_key_configured: !!RETELL_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🔑 Retell API Key: ${RETELL_API_KEY.substring(0, 10)}...`);
  console.log(`🤖 Retell Agent ID: ${RETELL_AGENT_ID}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
