
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import EventCard from '@/components/EventCard';
import LanguageBadge from '@/components/LanguageBadge';
import { ArrowRight, Globe } from 'lucide-react';

// Mock featured events
const featuredEvents = [
  {
    id: "1",
    title: "Spanish Tapas Night",
    host: {
      name: "Miguel Rodriguez",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop"
    },
    date: "August 15, 2023",
    time: "7:00 PM - 10:00 PM",
    location: "Barcelona Restaurant, Downtown",
    languages: [
      { name: "Spanish", level: "intermediate" as const },
      { name: "English", level: "native" as const }
    ],
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=2340&auto=format&fit=crop",
    attendees: 5,
    maxAttendees: 8
  },
  {
    id: "2",
    title: "Italian Pasta Making Workshop",
    host: {
      name: "Sofia Bianchi",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    },
    date: "August 22, 2023",
    time: "6:30 PM - 9:30 PM",
    location: "Cucina Italiana, Westside",
    languages: [
      { name: "Italian", level: "beginner" as const },
      { name: "English", level: "intermediate" as const }
    ],
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2274&auto=format&fit=crop",
    attendees: 3,
    maxAttendees: 6
  },
  {
    id: "3",
    title: "Japanese Sushi Experience",
    host: {
      name: "Kenji Tanaka",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=987&auto=format&fit=crop"
    },
    date: "August 29, 2023",
    time: "7:30 PM - 10:00 PM",
    location: "Sakura Sushi Bar, Eastside",
    languages: [
      { name: "Japanese", level: "beginner" as const },
      { name: "English", level: "advanced" as const }
    ],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2340&auto=format&fit=crop",
    attendees: 6,
    maxAttendees: 8
  }
];

// Languages for the filter section
const popularLanguages = [
  "Spanish", "French", "Italian", "German", "Japanese", 
  "Korean", "Mandarin", "Portuguese", "Russian", "Arabic"
];

const Index = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  
  // Toggle language selection
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        <section className="py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Featured Events
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl text-gray-600"
                >
                  Upcoming language dinners near you
                </motion.p>
              </div>
              <Button asChild size="lg" className="rounded-full bg-dinnerlingo-500 hover:bg-dinnerlingo-600">
                <Link to="/explore">
                  View All Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-dinnerlingo-50">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Explore by Language</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find events for the language you're learning
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {popularLanguages.map((language, index) => (
                <LanguageBadge
                  key={index}
                  language={language}
                  level="intermediate"
                  size="lg"
                  selected={selectedLanguages.includes(language)}
                  onClick={() => toggleLanguage(language)}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="rounded-full bg-dinnerlingo-500 hover:bg-dinnerlingo-600">
                <Link to="/explore">
                  Find Language Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2340&auto=format&fit=crop" 
                  alt="Host a dinner" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center rounded-full border border-dinnerlingo-200 bg-dinnerlingo-50 px-3 py-1 text-sm text-dinnerlingo-600 mb-4"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="font-medium">Host an Event</span>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Share Your Language and Culture
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-600 mb-8"
                >
                  Host a dinner event and connect with language enthusiasts while sharing your culture and cuisine. 
                  It's a rewarding way to meet new people and help others learn your native language.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button size="lg" className="rounded-full bg-dinnerlingo-500 hover:bg-dinnerlingo-600">
                    Become a Host
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-4">DinnerLingo</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">How It Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Events</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Hosts</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Safety</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Hosting</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Host an Event</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Responsible Hosting</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Resources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-dinnerlingo-500 text-white p-2 rounded-lg">
                <Globe size={20} />
              </div>
              <span className="font-semibold text-lg">DinnerLingo</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2023 DinnerLingo. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Terms</a>
              <a href="#" className="text-gray-600 hover:text-dinnerlingo-600">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
