import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Clock, Award } from 'lucide-react';
import { useGame } from '../context/GameContext';

const GameContextPage: React.FC = () => {
  const { civilizationId, mode } = useParams<{ 
    civilizationId: string; 
    mode: string;
  }>();
  const { selectedCivilization, startGame } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCivilization) {
      document.title = `${selectedCivilization.name} - Instrucciones | Cronos`;
    }
  }, [selectedCivilization]);

  const handleStartGame = () => {
    startGame();
    navigate(`/game/${civilizationId}/${mode}`);
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
        <h1 className="section-title text-center mb-8">
          Antes de Comenzar
        </h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div 
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedCivilization.image})` }}
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent to-black/70 flex items-end">
              <div className="p-6">
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  {selectedCivilization.name}
                </h2>
                <p className="text-white/90">
                  {selectedCivilization.period}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen size={20} className="mr-2 text-terracotta-500" />
              Contexto Histórico
            </h3>
            <p className="text-stone-700 mb-6">
              {selectedCivilization.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InfoBox 
                icon={<Clock size={20} className="text-gold-500" />}
                title="Modo de Juego"
                content={
                  mode === 'individual' 
                    ? "Has seleccionado el Modo Individual. No hay límite de tiempo y podrás utilizar pistas."
                    : "Has seleccionado el Modo Evaluación. Tendrás un tiempo limitado y no dispondrás de pistas."
                }
              />
              
              <InfoBox 
                icon={<Award size={20} className="text-gold-500" />}
                title="Tu Desafío"
                content={`Ordenar cronológicamente ${selectedCivilization.events.length} eventos históricos clave de ${selectedCivilization.name}.`}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-parchment-100 border border-parchment-300 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Instrucciones del Juego</h3>
          
          <ol className="space-y-4 list-decimal pl-5">
            <li className="text-stone-700">
              <span className="font-medium">Observa la línea temporal:</span> En la parte superior de la pantalla verás una línea temporal con los años correspondientes al período histórico seleccionado.
            </li>
            <li className="text-stone-700">
              <span className="font-medium">Examina los eventos:</span> En la parte inferior encontrarás tarjetas con eventos históricos en orden aleatorio.
            </li>
            <li className="text-stone-700">
              <span className="font-medium">Coloca cada evento:</span> Haz clic en un evento para obtener información y opciones de años donde colocarlo.
            </li>
            <li className="text-stone-700">
              <span className="font-medium">Revisa tus decisiones:</span> Puedes quitar un evento de la línea temporal si cambias de opinión haciendo clic en él.
            </li>
            <li className="text-stone-700">
              <span className="font-medium">Verifica tus respuestas:</span> Una vez hayas colocado todos los eventos, haz clic en el botón "Verificar" para evaluar tus respuestas.
            </li>
          </ol>
        </div>
        
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartGame}
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            <span>Comenzar el Desafío</span>
            <ChevronRight size={20} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

interface InfoBoxProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon, title, content }) => {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-md p-4">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="text-lg font-medium ml-2">{title}</h4>
      </div>
      <p className="text-stone-600">{content}</p>
    </div>
  );
};

export default GameContextPage;