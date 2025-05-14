import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, RotateCcw, Home } from 'lucide-react';
import { useGame } from '../context/GameContext';
import ResultsPanel from '../components/game/ResultsPanel';

const ResultsPage: React.FC = () => {
  const { civilizationId } = useParams<{ civilizationId: string }>();
  const { 
    selectedCivilization, 
    events,
    results,
    resetGame
  } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCivilization) {
      document.title = `${selectedCivilization.name} - Resultados | Cronos`;
    }
  }, [selectedCivilization]);

  const handlePlayAgain = () => {
    resetGame();
    navigate(`/game-mode/${civilizationId}`);
  };

  const handleShare = () => {
    // In a real app, this would implement social sharing functionality
    alert('¡Compartir puntuación! Esta funcionalidad estaría implementada en la versión final.');
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
          Resultados del Juego
        </h1>
        
        <ResultsPanel 
          score={results.score}
          correct={results.correct}
          incorrect={results.incorrect}
          allEvents={events}
        />
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handlePlayAgain}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <RotateCcw size={18} />
            <span>Jugar de Nuevo</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Home size={18} />
            <span>Volver al Inicio</span>
          </button>
          
          <button
            onClick={handleShare}
            className="border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 rounded-md px-4 py-2 font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <Share2 size={18} />
            <span>Compartir Puntuación</span>
          </button>
        </div>
        
        <div className="mt-12 bg-parchment-50 border border-parchment-200 rounded-lg p-6">
          <h2 className="text-xl font-display font-semibold mb-4">
            Lecciones Históricas
          </h2>
          <p className="text-stone-700 mb-4">
            Los eventos históricos que acabas de ordenar no ocurrieron de manera aislada.
            Las civilizaciones son el resultado de complejas interacciones de factores políticos, 
            sociales, económicos y culturales que se desarrollan a lo largo del tiempo.
          </p>
          <p className="text-stone-700">
            Comprender la cronología nos ayuda a identificar patrones, relaciones causa-efecto 
            y a contextualizar mejor los acontecimientos históricos dentro de su marco temporal.
          </p>
          
          <div className="mt-6 text-center">
            <a 
              href="#"
              className="text-terracotta-600 hover:text-terracotta-700 font-medium underline"
            >
              Explorar más sobre {selectedCivilization.name} en nuestra Wiki
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;