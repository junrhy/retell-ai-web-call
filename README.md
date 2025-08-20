# Retell AI Webcall Integration

## Project Structure

```
retell-ai-webcall/
├── frontend/          # React frontend application
├── backend/           # Express backend server
└── README.md         # This file
```

## Prerequisites

Before running this application, you'll need:

1. **Retell AI Account**: Sign up at [retellai.com](https://retellai.com)
2. **AI Agent**: Create an AI agent in your Retell dashboard
3. **Agent ID**: Get your agent ID from the Retell dashboard
4. **API Key**: Get your API key from the Retell dashboard

## Quick Start

### 1. Install All Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install-all
```

### 2. Configure Backend

Edit `backend/.env`:
```bash
PORT=3001
RETELL_API_KEY=your-api-key-here
RETELL_AGENT_ID=your-agent-id-here
```

### 3. Start Both Backend and Frontend

```bash
# Start both servers simultaneously
npm run dev
```

This will start:
- Backend on `http://localhost:3001`
- Frontend on `http://localhost:3000`

### Alternative: Start Servers Separately

```bash
# Start backend only
npm run backend

# Start frontend only  
npm run frontend
```

### 5. Test the Application

1. Open `http://localhost:3000` in your browser
2. Click "Start Call with AI Agent"
3. Allow microphone permissions when prompted
4. Start talking with your Retell AI agent!

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd frontend
npm start    # React development server
```

## API Endpoints

### Backend (`http://localhost:3001`)

- `POST /api/create-web-call` - Creates a web call and returns access token
- `GET /api/health` - Health check endpoint

## How It Works

1. **Frontend** requests microphone permission
2. **Frontend** calls backend API to create web call
3. **Backend** calls Retell AI API with your credentials
4. **Backend** returns access token to frontend
5. **Frontend** uses access token to start call with Retell AI SDK
6. **Real-time communication** begins between user and AI agent