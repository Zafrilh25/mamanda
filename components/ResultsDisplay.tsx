
import React, { useState } from 'react';
import ImagePreviewModal from './ImagePreviewModal';

interface ResultsDisplayProps {
  images: string[];
  isLoading: boolean;
}

// Skeleton loader component
const SkeletonCard: React.FC = () => (
  <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"></div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ images, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, index) => <SkeletonCard key={index} />)}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center bg-gray-100 rounded-lg p-8 h-full min-h-[400px]">
        <img src="https://picsum.photos/seed/fashion/200/200" alt="Empty state illustration" className="w-40 h-40 mb-4 rounded-full opacity-50" />
        <h3 className="text-xl font-semibold text-gray-700">Hasil Akan Muncul di Sini</h3>
        <p className="mt-2 text-gray-500">Lengkapi form di samping untuk mulai membuat foto katalog Anda.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => openModal(index)}
            role="button"
            aria-label={`Preview image ${index + 1}`}
          >
            <img
              src={src}
              alt={`Generated fashion editorial image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white opacity-0 group-hover:opacity-100 font-semibold transition-opacity duration-300">
                Preview
              </p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ImagePreviewModal
          images={images}
          startIndex={selectedImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ResultsDisplay;
