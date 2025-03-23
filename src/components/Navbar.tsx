
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-dinnerlingo-500 text-white p-2 rounded-lg">
            <Globe size={22} />
          </div>
          <span className="font-semibold text-xl">DinnerLingo</span>
        </Link>
        
        {isMobile ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        ) : (
          <nav className="flex items-center gap-8">
            <ul className="flex items-center gap-6">
              <li>
                <Link 
                  to="/" 
                  className={`font-medium transition-colors hover:text-dinnerlingo-600 ${
                    location.pathname === '/' ? 'text-dinnerlingo-500' : 'text-gray-600'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/explore" 
                  className={`font-medium transition-colors hover:text-dinnerlingo-600 ${
                    location.pathname === '/explore' ? 'text-dinnerlingo-500' : 'text-gray-600'
                  }`}
                >
                  Explore
                </Link>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="font-medium text-gray-600 transition-colors hover:text-dinnerlingo-600"
                >
                  How It Works
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full">Sign In</Button>
              <Button className="rounded-full bg-dinnerlingo-500 hover:bg-dinnerlingo-600">Join Now</Button>
            </div>
          </nav>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0,
            display: isMenuOpen ? 'block' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-4 mb-4">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 font-medium text-lg ${
                    location.pathname === '/' ? 'text-dinnerlingo-500' : 'text-gray-600'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/explore" 
                  className={`block py-2 font-medium text-lg ${
                    location.pathname === '/explore' ? 'text-dinnerlingo-500' : 'text-gray-600'
                  }`}
                >
                  Explore
                </Link>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="block py-2 font-medium text-lg text-gray-600"
                >
                  How It Works
                </a>
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-center">Sign In</Button>
              <Button className="w-full justify-center bg-dinnerlingo-500 hover:bg-dinnerlingo-600">Join Now</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
