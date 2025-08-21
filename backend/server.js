import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowed = process.env.FRONTEND_URL;
    if (!allowed) {
      return callback(null, true);
    }
    const isAllowed = [allowed].includes(origin);
    callback(null, isAllowed);
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Stability AI API configuration
const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
const getStabilityApiKey = () => process.env.STABILITY_API_KEY;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Image Generator Backend is running' });
});

// Generate image endpoint
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    const apiKey = getStabilityApiKey();
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Stability AI API key not configured'
      });
    }

    // Prepare request to Stability AI
    const requestBody = {
      text_prompts: [
        {
          text: prompt,
          weight: 1
        }
      ],
      cfg_scale: 8,
      height: 1024,
      width: 1024,
      samples: 1,
      steps: 40,
      style_preset: "digital-art",
      sampler: "K_DPMPP_2M"
    };

    console.log('Generating image for prompt:', prompt);

    // Call Stability AI API
    const response = await axios.post(STABILITY_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 60000 // 60 seconds timeout
    });

    // Extract the generated image
    const artifacts = response.data.artifacts;
    if (!artifacts || artifacts.length === 0) {
      return res.status(500).json({
        success: false,
        error: 'No image generated'
      });
    }

    const imageData = artifacts[0];
    const base64Image = imageData.base64;

    // Return the generated image as base64
    res.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`,
      prompt: prompt,
      seed: imageData.seed
    });

  } catch (error) {
    console.error('Error generating image:', error);

    // Handle specific API errors
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        return res.status(401).json({
          success: false,
          error: 'Invalid API key. Please check your Stability AI API key.'
        });
      } else if (status === 429) {
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded. Please try again later.'
        });
      } else if (status === 400) {
        return res.status(400).json({
          success: false,
          error: data.message || 'Invalid request to Stability AI API'
        });
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate image. Please try again.'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Image Generator Backend running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🎨 Generate images: http://localhost:${PORT}/generate-image`);
  
  if (!getStabilityApiKey()) {
    console.warn('⚠️  WARNING: STABILITY_API_KEY not set in environment variables');
  }
});
