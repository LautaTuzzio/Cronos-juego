import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, School } from 'lucide-react';
import { useGame } from '../context/GameContext';

const GameModePage: React.FC = () => {
  const { civilizationId } = useParams<{ civilizationId: string }>();
  const { selectCivilization, selectedCivilization, selectGameMode } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (civilizationId) {
      selectCivilization(civilizationId);
    }
  }, [civilizationId, selectCivilization]);

  useEffect(() => {
    if (selectedCivilization) {
      document.title = `${selectedCivilization.name} - Selección de Modo | Cronos`;
    }
  }, [selectedCivilization]);

  const handleModeSelect = (mode: 'individual' | 'evaluation') => {
    selectGameMode(mode);
    navigate(`/game-context/${civilizationId}/${mode}`);
  };

  if (!selectedCivilization) {
    return (
      <div className="page-container flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title text-center">
          Selecciona un Modo de Juego
        </h1>
        
        <div className="relative mb-8">
          <img 
            src={selectedCivilization.image} 
            alt={selectedCivilization.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
            <div className="p-6">
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                {selectedCivilization.name}
              </h2>
              <p className="text-white/90 text-sm">
                {selectedCivilization.period}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GameModeCard 
            title="Modo Individual"
            description="Practica y aprende a tu ritmo. Perfecto para reforzar conocimientos sin presión de tiempo."
            icon={<Laptop className="w-12 h-12 text-terracotta-500" />}
            features={[
              "Sin límite de tiempo",
              "Acceso a pistas",
              "Perfecto para práctica personal"
            ]}
            onClick={() => handleModeSelect('individual')}
            primary
          />
          
          <GameModeCard 
            title="Modo Evaluación"
            description="Pon a prueba tus conocimientos en condiciones de evaluación. Ideal para estudiantes preparándose para exámenes."
            icon={<School className="w-12 h-12 text-gold-500" />}
            features={[
              "Límite de tiempo",
              "Sin pistas disponibles",
              "Mayor puntuación por respuesta correcta"
            ]}
            onClick={() => handleModeSelect('evaluation')}
          />
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

interface GameModeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  onClick: () => void;
  primary?: boolean;
}

const GameModeCard: React.FC<GameModeCardProps> = ({
  title,
  description,
  icon,
  features,
  onClick,
  primary
}) => {
  return (
    <motion.div 
      className={`p-6 rounded-lg shadow-md border-2 ${
        primary ? 'border-terracotta-400' : 'border-stone-300'
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      
      <h3 className="text-xl font-display font-semibold text-center mb-3">
        {title}
      </h3>
      
      <p className="text-stone-600 text-center mb-6">
        {description}
      </p>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Características:</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className={`mr-2 text-2xl ${primary ? 'text-terracotta-500' : 'text-gold-500'}`}>•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={onClick}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          primary 
            ? 'bg-terracotta-500 hover:bg-terracotta-600 text-white' 
            : 'bg-gold-500 hover:bg-gold-600 text-stone-900'
        }`}
      >
        Seleccionar
      </button>
    </motion.div>
  );
};

export default GameModePage;