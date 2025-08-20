import React, { useState, useEffect } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { getConfig, validateConfig } from './config';
import './App.css';

function App() {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const [configErrors, setConfigErrors] = useState([]);

  useEffect(() => {
    // Validate configuration
    const config = getConfig();
    const validation = validateConfig(config);
    setConfigErrors(validation.errors);
    
    // Initialize the Retell Web Client
    const retellClient = new RetellWebClient();
    setClient(retellClient);

    // Set up event listeners
    retellClient.on('call_started', () => {
      console.log('Call started');
      setIsCallActive(true);
      setIsConnected(true);
      setCallStatus('Call started - Connected');
    });

    retellClient.on('call_ended', () => {
      console.log('Call ended');
      setIsCallActive(false);
      setIsConnected(false);
      setCallStatus('Call ended');
    });

    retellClient.on('agent_start_talking', () => {
      console.log('Agent started talking');
      setIsConnected(true);
      setCallStatus('Agent is speaking');
    });

    retellClient.on('agent_stop_talking', () => {
      console.log('Agent stopped talking');
      setCallStatus('Agent finished speaking');
    });

    retellClient.on('update', (update) => {
      console.log('Call update:', update);
      // Handle different types of updates
      if (update && update.transcript) {
        // Show the last sentence or a summary of the transcript
        const transcriptText = typeof update.transcript === 'string' 
          ? update.transcript 
          : 'Transcript updated';
        setCallStatus(`Transcript: ${transcriptText}`);
      } else if (update && typeof update === 'object') {
        // For other update objects, show a generic message
        setCallStatus('Call in progress...');
      } else {
        // Fallback for unexpected update types
        setCallStatus('Call active');
      }
    });

    retellClient.on('error', (error) => {
      console.error('Retell error:', error);
      setCallStatus(`Error: ${error.message}`);
    });

    // Cleanup on unmount
    return () => {
      if (retellClient && isCallActive) {
        retellClient.stopCall();
      }
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setCallStatus('Microphone permission denied. Please allow microphone access.');
      return false;
    }
  };

  const startCall = async () => {
    if (!client) {
      setCallStatus('Client not initialized');
      return;
    }

    // Check for configuration errors
    if (configErrors.length > 0) {
      setCallStatus('Configuration error: Please check your settings');
      return;
    }

    try {
      setCallStatus('Requesting microphone permission...');
      
      // Request microphone permission first
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }

      setCallStatus('Creating web call...');
      
      // Get access token from our backend
      const response = await fetch('http://localhost:3001/api/create-web-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to create web call');
      }

      const { access_token } = await response.json();
      
      setCallStatus('Starting call...');
      setIsCallActive(true);

      // Start call with access token
      await client.startCall({
        accessToken: access_token
      });
      
      setCallStatus('Call started successfully');
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus(`Failed to start call: ${error.message}`);
      setIsCallActive(false);
    }
  };

  const endCall = async () => {
    if (!client) return;

    try {
      await client.stopCall();
      setCallStatus('Ending call...');
    } catch (error) {
      console.error('Failed to end call:', error);
      setCallStatus(`Failed to end call: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Retell AI Webcall </h1>
        
        <div className="call-controls">
          <button 
            onClick={startCall}
            disabled={isCallActive}
            className={`call-button ${isCallActive ? 'disabled' : 'active'}`}
          >
            {isCallActive ? 'Call in Progress...' : 'Start Call with AI Agent'}
          </button>
          
          {isCallActive && (
            <button 
              onClick={endCall}
              className="end-call-button"
            >
              End Call
            </button>
          )}
        </div>

        <div className="status-display">
          <p><strong>Status:</strong> {callStatus || 'Ready to call'}</p>
          <p><strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}</p>
          <p><strong>Call Active:</strong> {isCallActive ? 'Yes' : 'No'}</p>
        </div>

        {configErrors.length > 0 && (
          <div className="config-errors">
            <h3>Configuration Errors:</h3>
            <ul>
              {configErrors.map((error, index) => (
                <li key={index} className="error-item">{error}</li>
              ))}
            </ul>
          </div>
        )}


      </header>
    </div>
  );
}

export default App;
