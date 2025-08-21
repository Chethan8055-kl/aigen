# AI Image Generator

A full-stack web application that generates AI images using Stability AI's API. Built with React, Node.js, and Tailwind CSS.

## Features

- 🎨 **AI Image Generation**: Create stunning images using Stability AI's API
- 🎤 **Voice Input**: Speak your prompts using the Web Speech API
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🖼️ **Image Gallery**: View, download, and regenerate your generated images
- ⚡ **Real-time Feedback**: Loading states and toast notifications
- 🔒 **Secure**: API keys stored in environment variables

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Web Speech API** - Voice input functionality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### API Integration
- **Stability AI API** - AI image generation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stability AI API key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mainproject
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Stability AI API Configuration
STABILITY_API_KEY=your_stability_ai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../vite-project
npm install
```

### 4. Get Stability AI API Key

1. Visit [Stability AI Platform](https://platform.stability.ai/)
2. Create an account or sign in
3. Navigate to your account settings
4. Generate an API key
5. Add the key to your `.env` file

## Running the Application

### Start the Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

### Start the Frontend

```bash
cd vite-project
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. **Enter a Prompt**: Type a description of the image you want to generate
2. **Voice Input**: Click the microphone button to speak your prompt
3. **Generate**: Click the send button or press Enter to generate the image
4. **View Results**: Generated images appear in the gallery below
5. **Download**: Click the download button to save images
6. **Regenerate**: Click the refresh button to generate a new version
7. **Delete**: Remove images you don't want to keep

## API Endpoints

### POST /generate-image
Generates an AI image based on the provided prompt.

**Request Body:**
```json
{
  "prompt": "A majestic dragon flying over a medieval castle"
}
```

**Response:**
```json
{
  "success": true,
  "image": "data:image/png;base64,...",
  "prompt": "A majestic dragon flying over a medieval castle",
  "seed": 123456789
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "AI Image Generator Backend is running"
}
```

## Project Structure

```
mainproject/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── vite-project/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── PromptInput.jsx
│   │   │   ├── ImageGallery.jsx
│   │   │   └── ImageCard.jsx
│   │   ├── App.jsx        # Main application
│   │   ├── App.css        # Custom styles
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `STABILITY_API_KEY` | Your Stability AI API key | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your Stability AI API key is valid
   - Check that the key is properly set in the `.env` file

2. **CORS Error**
   - Make sure the frontend URL in `.env` matches your frontend address
   - Check that both servers are running

3. **Voice Input Not Working**
   - Ensure you're using a supported browser (Chrome, Edge, Safari)
   - Check microphone permissions
   - Use HTTPS in production (required for Web Speech API)

4. **Images Not Loading**
   - Check network connectivity
   - Verify the backend is running
   - Check browser console for errors

### Development Tips

- Use browser dev tools to monitor network requests
- Check the backend console for API errors
- Test voice input in Chrome for best compatibility
- Use the health endpoint to verify backend status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the Stability AI documentation
3. Open an issue on GitHub

## Acknowledgments

- [Stability AI](https://stability.ai/) for providing the image generation API
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework

