# Deployment Guide - Render.com

This guide will help you deploy your Retell AI webcall application to Render.com for production.

## 🚀 **Deployment Steps**

### 1. **Prepare Your Repository**

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.).

### 2. **Deploy Combined Service**

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your repository**
4. **Configure the service:**
   - **Name:** `retell-ai-webcall`
   - **Environment:** `Node`
   - **Build Command:** 
     ```bash
     cd backend && npm install
     cd ../frontend && npm install && npm run build
     ```
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free (or choose paid plan)

5. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render will override this)
   - `RETELL_API_KEY` = `your-retell-api-key`
   - `RETELL_AGENT_ID` = `your-retell-agent-id`

6. **Deploy the service**

## 🔧 **How It Works**

- **Single Service:** Both backend and frontend run on one service
- **Backend:** Handles API calls and serves static files
- **Frontend:** Built during deployment and served by backend
- **Single URL:** Everything accessible at one domain

## 🔧 **Environment Variables**

### Service Environment Variables (Render Dashboard)
```bash
NODE_ENV=production
PORT=10000
RETELL_API_KEY=your-retell-api-key
RETELL_AGENT_ID=your-retell-agent-id
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

- **Service logs:** Available in Render dashboard
- **Health check:** `https://retell-ai-web-call.onrender.com/api/health`

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
- **Single URL:** `https://retell-ai-web-call.onrender.com`
- **API Endpoints:** `https://retell-ai-web-call.onrender.com/api/*`
- **Frontend:** `https://retell-ai-web-call.onrender.com`
