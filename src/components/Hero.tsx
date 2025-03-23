
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Users } from 'lucide-react';
import AnimatedImage from './AnimatedImage';

const imageUrls = [
  "https://images.unsplash.com/photo-1577303935007-0d306ee638cf?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2369&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?q=80&w=2372&auto=format&fit=crop"
];

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-28 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4"
          >
            <div className="inline-flex items-center rounded-full border border-dinnerlingo-200 bg-dinnerlingo-50 px-3 py-1 text-sm text-dinnerlingo-600 mb-4 w-max">
              <span className="font-medium">Launching Soon</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance">
              Connect Over Dinner. <br />
              <span className="text-dinnerlingo-500">Learn a Language.</span>
            </h1>
            <p className="text-xl text-gray-600 md:text-2xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed text-balance">
              Join intimate dinners with native speakers and language enthusiasts. Practice a new language while enjoying authentic cuisine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="rounded-full bg-dinnerlingo-500 hover:bg-dinnerlingo-600">
                <Link to="/explore">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-6">
              <div className="flex items-center space-x-2">
                <div className="bg-dinnerlingo-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-dinnerlingo-600" />
                </div>
                <div>
                  <p className="text-lg font-medium">5,000+</p>
                  <p className="text-gray-500 text-sm">Language Learners</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-dinnerlingo-100 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-dinnerlingo-600" />
                </div>
                <div>
                  <p className="text-lg font-medium">30+</p>
                  <p className="text-gray-500 text-sm">Languages</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:block relative">
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImage
                src={imageUrls[0]}
                alt="People enjoying dinner and conversation"
                delay={0.2}
                className="aspect-[3/4]"
              />
              <div className="grid grid-rows-2 gap-4">
                <AnimatedImage
                  src={imageUrls[1]}
                  alt="Learning language over food"
                  delay={0.4}
                  className="aspect-[4/3]"
                />
                <AnimatedImage
                  src={imageUrls[2]}
                  alt="International cuisine"
                  delay={0.6}
                  className="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
