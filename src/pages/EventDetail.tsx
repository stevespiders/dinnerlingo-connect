
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import LanguageBadge from '@/components/LanguageBadge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Globe, 
  MapPin, 
  MessageCircle, 
  Users,
  Utensils,
  ChevronLeft
} from 'lucide-react';
import { EventType } from '@/components/EventCard';

// Mock events data (same as in Explore.tsx)
const eventsData: EventType[] = [
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
  },
  {
    id: "4",
    title: "French Wine & Cheese Soirée",
    host: {
      name: "Amélie Dubois",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
    },
    date: "September 5, 2023",
    time: "8:00 PM - 11:00 PM",
    location: "Le Petit Bistro, River District",
    languages: [
      { name: "French", level: "intermediate" as const },
      { name: "English", level: "advanced" as const }
    ],
    image: "https://images.unsplash.com/photo-1567496395133-69a2e99071e7?q=80&w=2344&auto=format&fit=crop",
    attendees: 4,
    maxAttendees: 6
  },
  {
    id: "5",
    title: "Korean BBQ & Conversation",
    host: {
      name: "Ji-Hoon Park",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    date: "September 10, 2023",
    time: "7:00 PM - 10:00 PM",
    location: "Seoul Kitchen, Northside",
    languages: [
      { name: "Korean", level: "beginner" as const },
      { name: "English", level: "native" as const }
    ],
    image: "https://images.unsplash.com/photo-1590330813083-fc22d4b6a48c?q=80&w=2374&auto=format&fit=crop",
    attendees: 7,
    maxAttendees: 8
  },
  {
    id: "6",
    title: "Mandarin Practice & Dim Sum",
    host: {
      name: "Wei Chen",
      image: "https://images.unsplash.com/photo-1542190891-2093d38760f2?q=80&w=1974&auto=format&fit=crop"
    },
    date: "September 17, 2023",
    time: "11:00 AM - 2:00 PM",
    location: "Golden Dragon Restaurant, Chinatown",
    languages: [
      { name: "Mandarin", level: "intermediate" as const },
      { name: "Cantonese", level: "beginner" as const },
      { name: "English", level: "advanced" as const }
    ],
    image: "https://images.unsplash.com/photo-1610452220299-5edf90f4a0fd?q=80&w=2368&auto=format&fit=crop",
    attendees: 5,
    maxAttendees: 8
  }
];

// Extended event info with additional fields for the detail page
interface ExtendedEventInfo extends EventType {
  description: string;
  menuItems: string[];
  languageTopics: string[];
  price: string;
}

// Extended info for mock events
const eventDetails: Record<string, Partial<ExtendedEventInfo>> = {
  "1": {
    description: "Join us for an authentic Spanish tapas night where you can practice your Spanish language skills in a friendly, relaxed environment. Miguel, a native Spanish speaker, will guide the conversation with fun topics about Spanish culture, food, and travel. Perfect for intermediate Spanish learners looking to improve their conversational skills.",
    menuItems: ["Patatas Bravas", "Gambas al Ajillo", "Pan con Tomate", "Croquetas de Jamón", "Spanish Wines"],
    languageTopics: ["Travel in Spain", "Spanish Cuisine", "Cultural Traditions", "Current Events in Spain"],
    price: "$45 per person"
  },
  "2": {
    description: "Learn how to make authentic Italian pasta from scratch while practicing your Italian language skills! This hands-on workshop is led by Sofia, who grew up in Tuscany and will teach you traditional pasta-making techniques while guiding conversation in both Italian and English. Suitable for beginner Italian speakers.",
    menuItems: ["Handmade Pasta", "Classic Tomato Sauce", "Garlic Bread", "Tiramisu", "Italian Wine"],
    languageTopics: ["Italian Cooking Techniques", "Food Vocabulary", "Regional Italian Dialects", "Italian Cuisine History"],
    price: "$55 per person"
  },
  "3": {
    description: "Experience the art of Japanese cuisine while practicing your Japanese language skills in this immersive sushi dining event. Kenji, a Tokyo native, will guide you through basic Japanese conversation while you enjoy premium sushi and sake. This event is perfect for beginners wanting to practice Japanese in a real-world setting.",
    menuItems: ["Assorted Sushi & Sashimi", "Miso Soup", "Edamame", "Green Tea Ice Cream", "Premium Sake"],
    languageTopics: ["Japanese Dining Etiquette", "Food & Drink Vocabulary", "Basic Conversational Phrases", "Japanese Culture"],
    price: "$60 per person"
  },
  "4": {
    description: "Indulge in an evening of French wine and cheese while practicing your French language skills. Amélie, who grew up in Paris, will guide the conversation and teach you about French wine regions, cheese varieties, and culture. This soirée is ideal for intermediate French speakers looking to improve their conversation abilities.",
    menuItems: ["Selection of French Cheeses", "Fresh Baguette", "Charcuterie", "Fruit Preserves", "Wine Tasting Flight"],
    languageTopics: ["Wine Regions of France", "French Cuisine", "Parisian Culture", "Travel in France"],
    price: "$50 per person"
  },
  "5": {
    description: "Experience authentic Korean BBQ while learning and practicing Korean language basics. Ji-Hoon will guide you through grilling techniques and basic Korean conversation, creating an immersive cultural and linguistic experience. This event is perfect for beginners interested in Korean language and culture.",
    menuItems: ["Bulgogi", "Samgyeopsal", "Banchan Side Dishes", "Kimchi", "Soju & Korean Beer"],
    languageTopics: ["Korean Greetings", "Food Vocabulary", "Basic Conversation", "K-Pop & Korean Culture"],
    price: "$48 per person"
  },
  "6": {
    description: "Join Wei for a morning of dim sum and Mandarin conversation practice. Learn about Chinese tea culture and enjoy a variety of dim sum dishes while practicing your Mandarin skills. Wei is fluent in Mandarin, Cantonese, and English, making this event perfect for learners at various levels.",
    menuItems: ["Har Gow (Shrimp Dumplings)", "Siu Mai", "Char Siu Bao", "Egg Tarts", "Chinese Tea Selection"],
    languageTopics: ["Chinese Tea Culture", "Dim Sum Traditions", "Basic Mandarin Phrases", "Chinese Characters"],
    price: "$40 per person"
  }
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<ExtendedEventInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get event details
    setTimeout(() => {
      const foundEvent = eventsData.find(event => event.id === id);
      
      if (foundEvent) {
        const details = eventDetails[id || ""] || {};
        setEvent({ ...foundEvent, ...details } as ExtendedEventInfo);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 md:px-6 pt-28 pb-16 mx-auto flex items-center justify-center">
          <div className="animate-pulse-subtle">
            <Globe className="h-12 w-12 text-dinnerlingo-500 animate-spin opacity-70" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container px-4 md:px-6 pt-28 pb-16 mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find the event you're looking for. It may have been removed or the link is incorrect.
            </p>
            <Button asChild>
              <Link to="/explore">Browse All Events</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <Link 
            to="/explore" 
            className="inline-flex items-center text-dinnerlingo-600 hover:text-dinnerlingo-700 mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Events</span>
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-xl mb-8"
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full aspect-[16/9] object-cover"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.languages.map((lang, idx) => (
                    <LanguageBadge 
                      key={idx} 
                      language={lang.name} 
                      level={lang.level} 
                    />
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src={event.host.image} 
                    alt={event.host.name} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-gray-700">Hosted by <span className="font-medium">{event.host.name}</span></span>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">About this event</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card p-5">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-dinnerlingo-500" />
                        <span>Menu Highlights</span>
                      </h3>
                      <ul className="space-y-2">
                        {event.menuItems?.map((item, idx) => (
                          <li key={idx} className="text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-5">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-dinnerlingo-500" />
                        <span>Conversation Topics</span>
                      </h3>
                      <ul className="space-y-2">
                        {event.languageTopics?.map((topic, idx) => (
                          <li key={idx} className="text-gray-600">• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-28 h-max"
            >
              <div className="glass-card p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-dinnerlingo-500" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-dinnerlingo-500" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-dinnerlingo-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-dinnerlingo-500" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-gray-600">{event.attendees} of {event.maxAttendees} spots filled</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-dinnerlingo-500" />
                    <div>
                      <p className="font-medium">Languages</p>
                      <p className="text-gray-600">
                        {event.languages.map(lang => lang.name).join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  {event.price && (
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <p className="font-medium text-lg">{event.price}</p>
                    </div>
                  )}
                </div>
                
                <Button className="w-full bg-dinnerlingo-500 hover:bg-dinnerlingo-600">
                  Reserve a Spot
                </Button>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Share this event</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-dinnerlingo-500 text-white p-2 rounded-lg">
                <Globe size={20} />
              </div>
              <span className="font-semibold text-lg">DinnerLingo</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2023 DinnerLingo. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventDetail;
