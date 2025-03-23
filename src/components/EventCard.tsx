
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageBadge from './LanguageBadge';

export type EventType = {
  id: string;
  title: string;
  host: {
    name: string;
    image: string;
  };
  date: string;
  time: string;
  location: string;
  languages: {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  }[];
  image: string;
  attendees: number;
  maxAttendees: number;
};

type EventCardProps = {
  event: EventType;
  index?: number;
};

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden h-full flex flex-col"
    >
      <Link to={`/event/${event.id}`} className="block relative">
        <div className="aspect-[3/2] overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {event.languages.slice(0, 2).map((lang, idx) => (
            <LanguageBadge 
              key={idx} 
              language={lang.name} 
              level={lang.level} 
              size="sm" 
            />
          ))}
          {event.languages.length > 2 && (
            <span className="bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded-full">
              +{event.languages.length - 2}
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={event.host.image} 
            alt={event.host.name} 
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <span className="text-sm text-gray-600">Hosted by {event.host.name}</span>
        </div>
        
        <Link to={`/event/${event.id}`} className="block">
          <h3 className="font-semibold text-lg mb-3 hover:text-dinnerlingo-600 transition-colors">
            {event.title}
          </h3>
        </Link>
        
        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{event.attendees} of {event.maxAttendees} spots filled</span>
          </div>
        </div>
        
        <Link 
          to={`/event/${event.id}`} 
          className="mt-auto inline-flex justify-center items-center py-2 px-4 bg-dinnerlingo-50 hover:bg-dinnerlingo-100 text-dinnerlingo-600 rounded-lg font-medium text-sm transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
