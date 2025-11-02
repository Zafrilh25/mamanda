
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon, DownloadIcon, ZoomInIcon } from './Icons';

declare global {
    interface Window {
        JSZip: any;
    }
}

interface ImagePreviewModalProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setIsZoomed(false);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setIsZoomed(false);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);
  
  const downloadImage = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadAll = async () => {
    if (!window.JSZip) {
      alert('Could not download all files. JSZip library not found.');
      return;
    }
    setIsDownloading(true);
    const zip = new window.JSZip();
    images.forEach((src, index) => {
      const base64Data = src.split(',')[1];
      zip.file(`fashion_editorial_${index + 1}.png`, base64Data, { base64: true });
    });
    
    try {
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'fashion_product_studio_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Error creating zip file", error);
        alert("Failed to create zip file.");
    } finally {
        setIsDownloading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        
        {/* Main Image Display */}
        <div className="relative w-auto h-[80vh] flex items-center justify-center">
            <img
                src={images[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                className={`max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                onClick={() => setIsZoomed(!isZoomed)}
            />
        </div>

        {/* Controls */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors" aria-label="Close preview">
          <XIcon className="w-8 h-8" />
        </button>

        <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Previous image">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>

        <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Next image">
          <ChevronRightIcon className="w-8 h-8" />
        </button>
        
        <button onClick={() => setIsZoomed(!isZoomed)} className="absolute top-4 left-4 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors" aria-label={isZoomed ? "Zoom out" : "Zoom in"}>
          <ZoomInIcon className="w-7 h-7" />
        </button>
        
        {/* Bottom Bar for Downloads & Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-xl flex items-center gap-4">
            <button onClick={() => downloadImage(images[currentIndex], `fashion_editorial_${currentIndex + 1}.png`)} className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <DownloadIcon className="w-5 h-5" />
                <span>Download</span>
            </button>
            <div className="w-px h-6 bg-white/30"></div>
            <button onClick={handleDownloadAll} disabled={isDownloading} className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-wait">
                {isDownloading ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span><span>Zipping...</span></> : <> <DownloadIcon className="w-5 h-5" /><span>Download All (ZIP)</span></>}
            </button>
             <div className="w-px h-6 bg-white/30"></div>
            <p className="text-white font-medium">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
