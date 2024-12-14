import React, { useState, useEffect } from 'react';
import '../styles/ImageLoader.css';

const ImageLoader = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div className={`image-loader-container ${className}`}>
      {isLoading && (
        <div className="image-loader-skeleton">
          <div className="loader-pulse"></div>
        </div>
      )}
      {error ? (
        <div className="image-error">
          <span role="img" aria-label="warning">⚠️</span>
          <p>Failed to load image</p>
          <button 
            onClick={() => {
              setIsLoading(true);
              setError(false);
              // Force reload the image
              setImageSrc(`${src}?reload=${Date.now()}`);
            }}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className={`loaded-image ${isLoading ? 'loading' : 'loaded'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageLoader;
