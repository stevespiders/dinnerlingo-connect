
import { motion } from 'framer-motion';

type LanguageBadgeProps = {
  language: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'native';
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
};

const LanguageBadge = ({ 
  language, 
  level = 'intermediate',
  size = 'md',
  selected = false,
  onClick 
}: LanguageBadgeProps) => {
  // Map level to color
  const levelColors = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    advanced: 'bg-orange-100 text-orange-700 border-orange-200',
    native: 'bg-blue-100 text-blue-700 border-blue-200'
  };
  
  // Map size to padding and text size
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };
  
  const cursor = onClick ? 'cursor-pointer' : 'cursor-default';
  
  return (
    <motion.div
      whileHover={{ scale: onClick ? 1.05 : 1 }}
      whileTap={{ scale: onClick ? 0.95 : 1 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        inline-flex items-center rounded-full font-medium
        border transition-all
        ${levelColors[level]}
        ${sizeClasses[size]}
        ${cursor}
        ${selected ? 'ring-2 ring-offset-2 ring-dinnerlingo-500' : ''}
      `}
    >
      {language}
    </motion.div>
  );
};

export default LanguageBadge;
