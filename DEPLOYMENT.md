# Deployment Guide

## Frontend Deployment on Netlify

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy Frontend on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository: `ishratarshad/fullstack-assessment`
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/out`
6. Click "Deploy site"

### Step 3: Deploy Backend on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `fullstack-assessment-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free
5. Click "Create Web Service"

### Step 4: Update Frontend Environment Variable
1. After backend is deployed, copy the Render URL
2. In Netlify, go to Site settings → Environment variables
3. Add: `NEXT_PUBLIC_API_URL` = `https://your-render-app.onrender.com`
4. Redeploy frontend

## Alternative: All-in-One Netlify Deployment

If you prefer to keep everything on Netlify, convert the backend to Netlify Functions:

### Backend as Netlify Functions
Create `netlify/functions/api.js`:
```javascript
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
  const results = [];
  const csvPath = path.join(__dirname, '../../backend/data.csv');
  
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      res.json(results);
    });
});

module.exports.handler = serverless(app);
```

## Environment Variables for Production

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```
NODE_ENV=production
PORT=5000
```
