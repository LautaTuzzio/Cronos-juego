import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Civilization } from '../../data/civilizations';

interface CivilizationCardProps {
  civilization: Civilization;
  index: number;
}

const CivilizationCard: React.FC<CivilizationCardProps> = ({ civilization, index }) => {
  const navigate = useNavigate();
  const totalEvents = civilization.events.length;
  const progress = civilization.bestProgress || 0;
  const progressPercentage = totalEvents > 0 ? (progress / totalEvents) * 100 : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${civilization.image})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="font-display text-xl font-bold text-white p-4">
            {civilization.name}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-stone-500 mb-2">{civilization.period}</p>
        <p className="text-stone-700 mb-4 line-clamp-3">{civilization.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-stone-600 mb-1">
            <span>Progreso</span>
            <span>{progress}/{totalEvents} eventos</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2.5">
            <div 
              className="bg-terracotta-500 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <button
          onClick={() => navigate(`/game-mode/${civilization.id}`)}
          className="w-full flex items-center justify-center space-x-2 btn-primary py-2"
        >
          <span>Jugar</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CivilizationCard;