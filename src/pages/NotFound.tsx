
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto pt-28 pb-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="bg-dinnerlingo-100 inline-flex p-6 rounded-full mb-6">
            <Globe className="h-12 w-12 text-dinnerlingo-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-dinnerlingo-500 hover:bg-dinnerlingo-600 rounded-full">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/explore">Explore Events</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
