import { useState } from 'react';
import { Download, RefreshCw, Trash2, Heart, Share2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageCard from './ImageCard';

const ImageGallery = ({ images, onRegenerate, onDownload, onDelete, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleRegenerate = async (image) => {
    const result = await onRegenerate(image.prompt, image.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleDownload = (image) => {
    try {
      onDownload(image.imageUrl, image.prompt);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleDelete = (imageId) => {
    onDelete(imageId);
    toast.success('Image deleted');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No images generated yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start by entering a prompt above to generate your first AI image!
          </p>
          <div className="text-xs text-gray-500">
            <p>💡 Try prompts like:</p>
            <ul className="mt-2 space-y-1">
              <li>• "A majestic dragon flying over a medieval castle"</li>
              <li>• "Cyberpunk cityscape at night with neon lights"</li>
              <li>• "Portrait of a wise old wizard in a magical forest"</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Generated Images ({images.length})
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Latest first</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onRegenerate={() => handleRegenerate(image)}
            onDownload={() => handleDownload(image)}
            onDelete={() => handleDelete(image.id)}
            onSelect={() => setSelectedImage(image)}
            isLoading={isLoading}
            formatDate={formatDate}
          />
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Generated Image</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.prompt}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Prompt:</strong> {selectedImage.prompt}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Generated:</strong> {formatDate(selectedImage.timestamp)}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Seed:</strong> {selectedImage.seed}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleDownload(selectedImage)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    handleRegenerate(selectedImage);
                    setSelectedImage(null);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

