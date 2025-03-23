
import { motion } from 'framer-motion';
import { Globe, MessageCircle, Utensils, Users } from 'lucide-react';

const featureItems = [
  {
    icon: <Globe className="h-12 w-12 text-dinnerlingo-500" />,
    title: "Language Immersion",
    description: "Practice languages with native speakers in a natural, conversational setting."
  },
  {
    icon: <Utensils className="h-12 w-12 text-dinnerlingo-500" />,
    title: "Cultural Dining",
    description: "Experience authentic cuisine from the culture of the language you're learning."
  },
  {
    icon: <Users className="h-12 w-12 text-dinnerlingo-500" />,
    title: "Community Building",
    description: "Connect with like-minded people who share your passion for languages and culture."
  },
  {
    icon: <MessageCircle className="h-12 w-12 text-dinnerlingo-500" />,
    title: "Guided Conversations",
    description: "Structured topics and icebreakers to keep conversations flowing naturally."
  }
];

const Features = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            How DinnerLingo Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our platform brings together food and language learning in a meaningful way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-dinnerlingo-50 p-4 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 grid md:grid-cols-3 gap-6 lg:gap-12"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">1. Find an Event</h3>
            <p className="text-gray-600">Browse language dining events by location, language, or cuisine. Filter for your preferred language level.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">2. Book Your Spot</h3>
            <p className="text-gray-600">Reserve your place at the table. Each event has limited spots to ensure quality conversations.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">3. Connect & Learn</h3>
            <p className="text-gray-600">Enjoy a delicious meal while practicing your target language with native speakers and fellow learners.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
