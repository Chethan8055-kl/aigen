import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import PromptInput from './components/PromptInput';
import ImageGallery from './components/ImageGallery';
import Header from './components/Header';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (prompt) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success) {
        const newImage = {
          id: Date.now(),
          imageUrl: data.image,
          prompt: data.prompt,
          seed: data.seed,
          timestamp: new Date().toISOString(),
        };

        setGeneratedImages(prev => [newImage, ...prev]);
        return { success: true, message: 'Image generated successfully!' };
      } else {
        return { success: false, message: data.error || 'Failed to generate image' };
      }
    } catch (error) {
      console.error('Error generating image:', error);
      return { 
        success: false, 
        message: 'Network error. Please check if the backend server is running.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateImage = async (prompt, imageId) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success) {
        const updatedImage = {
          id: imageId,
          imageUrl: data.image,
          prompt: data.prompt,
          seed: data.seed,
          timestamp: new Date().toISOString(),
        };

        setGeneratedImages(prev => 
          prev.map(img => img.id === imageId ? updatedImage : img)
        );
        return { success: true, message: 'Image regenerated successfully!' };
      } else {
        return { success: false, message: data.error || 'Failed to regenerate image' };
      }
    } catch (error) {
      console.error('Error regenerating image:', error);
      return { 
        success: false, 
        message: 'Network error. Please check if the backend server is running.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = (imageUrl, prompt) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-generated-${prompt.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteImage = (imageId) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <PromptInput 
            onGenerateImage={generateImage}
            isLoading={isLoading}
          />
          
          <ImageGallery 
            images={generatedImages}
            onRegenerate={regenerateImage}
            onDownload={downloadImage}
            onDelete={deleteImage}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
