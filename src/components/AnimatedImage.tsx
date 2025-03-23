
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type AnimatedImageProps = {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
};

const AnimatedImage = ({ src, alt, delay = 0, className = "" }: AnimatedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: delay }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
    </motion.div>
  );
};

export default AnimatedImage;
