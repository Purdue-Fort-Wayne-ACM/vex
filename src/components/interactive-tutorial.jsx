import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const InteractiveTutorial = ({ 
  images = [
    { 
      src: 'https://placehold.co/600x400/4A90E2/FFFFFF?text=Step+1', 
      comment: 'Welcome to our tutorial! This is the first step where we introduce the basic concepts.' 
    },
    { 
      src: 'https://placehold.co/600x400/7ED321/FFFFFF?text=Step+2', 
      comment: 'Now we\'ll set up your environment. Make sure you have all the necessary tools installed.' 
    },
    { 
      src: 'https://placehold.co/600x400/F5A623/FFFFFF?text=Step+3', 
      comment: 'Configure your settings according to your needs. This step is crucial for optimal performance.' 
    },
    { 
      src: 'https://placehold.co/600x400/BD10E0/FFFFFF?text=Step+4', 
      comment: 'Time to implement the solution! Follow the code examples and best practices shown.' 
    },
    { 
      src: 'https://placehold.co/600x400/B8E986/FFFFFF?text=Step+5', 
      comment: 'Test your implementation thoroughly. Run the provided test cases to ensure everything works.' 
    },
    { 
      src: 'https://placehold.co/600x400/50E3C2/FFFFFF?text=Step+6', 
      comment: 'Finally, deploy your solution! You\'ve completed the tutorial successfully.' 
    }
  ]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navigate to previous image
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // Navigate to next image
  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, currentIndex]);

  // Handle click outside modal
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!images || images.length === 0) {
    return <div className="text-center p-8 text-gray-500">No tutorial content available</div>;
  }

  return (
    <div className="max-w-5xl w-11/12 mx-auto p-6 bg-main rounded-lg shadow-lg">
      {/* Tutorial Header */}
      <div className="text-center mb-6">
        {/* TODO: make this editable at some point as a prop*/}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Micro-Tutorial</h2>
        <div className="text-sm text-gray-500">
          Step {currentIndex + 1} of {images.length}
        </div>
      </div>

      {/* Main Tutorial Container */}
      <div className="relative">
        {/* Image Container */}
        <div className="relative group">
          <img
            src={images[currentIndex].src}
            alt={`Tutorial step ${currentIndex + 1}`}
            className="w-full h-auto rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02] block"
            onClick={openModal}
            loading="lazy"
          />
          
          {/* Click to zoom hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-opacity-10 transition-all duration-200 rounded-lg pointer-events-none">
            <div className="bg-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
              🔍 Click to zoom
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg min-w-10/12 max-w-10/12 mx-auto overflow-x-visible ">
        <p className="text-gray-700 leading-relaxed">{images[currentIndex].comment}</p>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
        >
          <div className="min-w-11/12 h-11/12 flex flex-col">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-10 bg-white bg-opacity-90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Modal Image */}
            <div className="relative h-full contents">
              <img
                src={images[currentIndex].src}
                alt={`Tutorial step ${currentIndex + 1} - enlarged`}
                className="max-h-11/12 max-w-11/12 w-auto h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Navigation */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

            {/* Modal Comment */}
            <div className="mt-4 bg-main bg-opacity-95 p-4 rounded-lg max-w-full">
              <p className="text-gray-800 dark:text-gray-300 text-center leading-relaxed">{images[currentIndex].comment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveTutorial;