import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Event } from '../../data/civilizations';

interface EventCardProps {
  event: Event;
  isPlaced: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isPlaced,
  isCorrect,
  isIncorrect
}) => {
  const { placeEvent } = useGame();
  const [showDetails, setShowDetails] = useState(false);

  // Handle the click on year button
  const handlePlaceEvent = (year: string) => {
    placeEvent(event.id, year);
  };

  // Format year to display BCE/CE
  const formatYear = (year: string) => {
    const numYear = parseInt(year);
    return numYear < 0 
      ? `${Math.abs(numYear)} a.C.`
      : `${numYear} d.C.`;
  };

  // Conditionally set classes based on state
  let cardClasses = "p-4 rounded-lg shadow-md transition-all duration-200 ";
  if (isPlaced) {
    cardClasses += "hidden ";
  } else {
    cardClasses += "bg-white hover:shadow-lg cursor-pointer ";
  }

  if (isCorrect) {
    cardClasses += "border-2 border-green-500 ";
  } else if (isIncorrect) {
    cardClasses += "border-2 border-red-500 ";
  }

  return (
    <motion.div 
      className={cardClasses}
      whileHover={!isPlaced ? { scale: 1.02 } : {}}
      onClick={() => !isPlaced && setShowDetails(!showDetails)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-20 h-20 object-cover rounded-md flex-shrink-0" 
        />
        <div>
          <h3 className="font-medium text-lg">{event.title}</h3>
          <p className="text-sm text-stone-600 mt-1">{event.briefDescription}</p>
          
          {showDetails && !isPlaced && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <p className="text-sm text-stone-700 mb-3">{event.importance}</p>
              <div className="flex flex-wrap gap-2">
                {/* Generate buttons for available years */}
                {[-753, -509, -264, -44, -27, 80, 476].map(year => (
                  <button
                    key={year}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaceEvent(year.toString());
                    }}
                    className="px-3 py-1 text-xs bg-parchment-100 hover:bg-parchment-200 
                      border border-parchment-300 rounded-full transition-colors"
                  >
                    {formatYear(year.toString())}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;