import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import EventCard, { EventType } from '@/components/EventCard';
import LanguageBadge from '@/components/LanguageBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, Globe, MapPin, Search } from 'lucide-react';

// Mock events data
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

// Languages for filtering
const languages = [
  "Spanish", "French", "Italian", "German", "Japanese", 
  "Korean", "Mandarin", "Portuguese", "Russian", "Arabic"
];

// Locations for filtering
const locations = [
  "Downtown", "Westside", "Eastside", "Northside", "River District", "Chinatown"
];

const Explore = () => {
  const [events, setEvents] = useState<EventType[]>(eventsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Toggle language selection
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  // Filter events
  useEffect(() => {
    let filteredEvents = eventsData;
    
    // Filter by search term
    if (searchTerm) {
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selected languages
    if (selectedLanguages.length > 0) {
      filteredEvents = filteredEvents.filter(event => 
        event.languages.some(lang => selectedLanguages.includes(lang.name))
      );
    }
    
    // Filter by selected location
    if (selectedLocation) {
      filteredEvents = filteredEvents.filter(event => 
        event.location.includes(selectedLocation)
      );
    }
    
    setEvents(filteredEvents);
  }, [searchTerm, selectedLanguages, selectedLocation]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container px-4 md:px-6 mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                Explore Language Dining Events
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-600"
              >
                Find the perfect event to practice your language skills
              </motion.p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="flex items-center gap-2 md:self-end"
            >
              <Filter size={18} />
              Filters
            </Button>
          </div>
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text" 
              placeholder="Search events by title or location" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isFilterVisible ? 1 : 0, 
              height: isFilterVisible ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 overflow-hidden"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label className="mb-2 block">Filter by Language</Label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language, index) => (
                    <LanguageBadge
                      key={index}
                      language={language}
                      level="intermediate"
                      size="md"
                      selected={selectedLanguages.includes(language)}
                      onClick={() => toggleLanguage(language)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Location</Label>
                <Select 
                  value={selectedLocation} 
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Location</SelectItem>
                    {locations.map((location, index) => (
                      <SelectItem key={index} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLanguages([]);
                    setSelectedLocation('');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </motion.div>
          
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-dinnerlingo-100 inline-flex p-4 rounded-full mb-6">
                <Globe className="h-8 w-8 text-dinnerlingo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We couldn't find any events that match your search criteria. Try adjusting your filters or search term.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLanguages([]);
                  setSelectedLocation('');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </section>
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

export default Explore;
