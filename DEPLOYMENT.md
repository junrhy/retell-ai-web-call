# Deployment Guide - Render.com

This guide will help you deploy your Retell AI webcall application to Render.com for production.

## 🚀 **Deployment Steps**

### 1. **Prepare Your Repository**

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.).

### 2. **Deploy Backend First**

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your repository**
4. **Configure the backend service:**
   - **Name:** `retell-ai-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free (or choose paid plan)

5. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render will override this)
   - `RETELL_API_KEY` = `your-retell-api-key`
   - `RETELL_AGENT_ID` = `your-retell-agent-id`

6. **Deploy the backend**

### 3. **Deploy Frontend**

1. **Click "New +"** → **"Static Site"**
2. **Connect the same repository**
3. **Configure the frontend service:**
   - **Name:** `retell-ai-frontend`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`
   - **Plan:** Free

4. **Set Environment Variables:**
   - `REACT_APP_BACKEND_URL` = `https://your-backend-name.onrender.com`

5. **Deploy the frontend**

### 4. **Update CORS Settings**

After deployment, update the backend CORS settings in `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-name.onrender.com',
    'https://your-custom-domain.com' // if you have one
  ],
  credentials: true
}));
```

## 🔧 **Environment Variables**

### Backend (.env or Render Dashboard)
```bash
NODE_ENV=production
PORT=10000
RETELL_API_KEY=your-retell-api-key
RETELL_AGENT_ID=your-retell-agent-id
```

### Frontend (Render Dashboard)
```bash
REACT_APP_BACKEND_URL=https://your-backend-name.onrender.com
```

## 🌐 **Custom Domains (Optional)**

1. **Add custom domain** in Render dashboard
2. **Update CORS origins** in backend
3. **Update frontend environment variable**

## 🔒 **Security Notes**

- ✅ API keys are stored securely on Render
- ✅ Frontend never sees sensitive credentials
- ✅ HTTPS is automatically enabled
- ✅ CORS is properly configured

## 📊 **Monitoring**

- **Backend logs:** Available in Render dashboard
- **Frontend:** Static hosting, no server logs
- **Health check:** `https://your-backend.onrender.com/api/health`

## 🚨 **Important Notes**

1. **Free tier limitations:**
   - Services may sleep after inactivity
   - Limited bandwidth and build minutes
   - Consider upgrading for production use

2. **HTTPS required:**
   - Microphone permissions require HTTPS
   - Render provides this automatically

3. **Environment variables:**
   - Never commit API keys to Git
   - Use Render's environment variable system

## 🔄 **Updates**

To update your application:
1. Push changes to your Git repository
2. Render will automatically redeploy
3. No manual intervention needed

## 🆘 **Troubleshooting**

### Common Issues:

1. **CORS errors:**
   - Check CORS origins in backend
   - Ensure frontend URL is correct

2. **API key errors:**
   - Verify environment variables in Render dashboard
   - Check Retell AI dashboard for valid credentials

3. **Build failures:**
   - Check build logs in Render dashboard
   - Verify package.json dependencies

4. **Microphone not working:**
   - Ensure HTTPS is enabled
   - Check browser permissions

---

**Your app will be available at:**
- Frontend: `https://your-frontend-name.onrender.com`
- Backend: `https://your-backend-name.onrender.com`
