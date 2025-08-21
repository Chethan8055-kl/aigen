# AI Image Generator - Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Free)
**Frontend + Backend on Vercel**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Backend:**
   ```bash
   cd backend
   vercel --prod
   ```
   - Set environment variables in Vercel dashboard:
     - `STABILITY_API_KEY`: Your Stability AI key

3. **Deploy Frontend:**
   ```bash
   cd vite-project
   vercel --prod
   ```
   - Set environment variable:
     - `VITE_API_URL`: Your backend URL

### Option 2: Railway (Free Tier)
**Full-stack deployment**

1. **Connect GitHub repository**
2. **Set environment variables:**
   - `STABILITY_API_KEY`: Your Stability AI key
   - `PORT`: 5000
3. **Deploy automatically**

### Option 3: Render (Free Tier)
**Backend on Render, Frontend on Vercel**

1. **Backend on Render:**
   - Connect GitHub repo
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set environment variables

2. **Frontend on Vercel:**
   - Deploy vite-project folder
   - Set `VITE_API_URL` to Render backend URL

### Option 4: Docker Deployment
**Local or Cloud**

```bash
# Build and run locally
docker-compose up -d

# Or deploy to cloud platforms supporting Docker
```

## 🔧 Environment Variables

### Backend (.env)
```env
STABILITY_API_KEY=your_stability_ai_api_key_here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

## 📦 Build Commands

### Frontend
```bash
cd vite-project
npm run build
```

### Backend
```bash
cd backend
npm start
```

## 🌐 Domain Configuration

### CORS Settings
Update `backend/server.js` CORS origins:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### Frontend API URL
Update API calls in frontend to use environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## 🔒 Security Considerations

1. **API Key Protection:**
   - Never commit `.env` files
   - Use environment variables in production
   - Rotate keys regularly

2. **CORS Configuration:**
   - Restrict origins to your domains
   - Enable credentials only if needed

3. **Rate Limiting:**
   - Consider adding rate limiting middleware
   - Monitor API usage

## 📊 Monitoring

### Health Checks
- Backend: `GET /health`
- Frontend: `GET /health`

### Logs
- Monitor application logs
- Set up error tracking (Sentry, etc.)

## 🚀 Production Checklist

- [ ] Environment variables set
- [ ] CORS origins configured
- [ ] SSL certificates installed
- [ ] Domain names configured
- [ ] Health checks working
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Security headers set

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check CORS origins in backend
   - Verify frontend URL is correct

2. **API Key Issues:**
   - Verify key is valid
   - Check environment variables

3. **Build Failures:**
   - Check Node.js version (>=16)
   - Verify all dependencies installed

### Support
- Check application logs
- Verify environment variables
- Test endpoints individually

