import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Timeline from '../components/game/Timeline';
import EventCard from '../components/game/EventCard';

const GamePage: React.FC = () => {
  const { civilizationId, mode } = useParams<{ 
    civilizationId: string; 
    mode: string;
  }>();
  const { 
    selectedCivilization, 
    events, 
    placedEvents,
    results,
    isGameComplete,
    verifyEvents
  } = useGame();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  
  // Calculate timeline years based on the events
  const timelineYears = ['-753', '-509', '-264', '-44', '-27', '80', '476'];
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!selectedCivilization || events.length === 0) {
      navigate(`/game-mode/${civilizationId}`);
    }
  }, [selectedCivilization, events, navigate, civilizationId]);

  useEffect(() => {
    if (selectedCivilization) {
      document.title = `${selectedCivilization.name} - Juego | Cronos`;
    }
  }, [selectedCivilization]);

  const handleVerify = () => {
    verifyEvents();
    setIsVerified(true);
  };
  
  if (!selectedCivilization || events.length === 0) {
    return (
      <div className="page-container flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  const allEventsPlaced = Object.keys(placedEvents).length === events.length;

  return (
    <div className="page-container pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="w-full lg:w-3/4 mb-8 lg:mb-0">
            <h1 className="text-2xl font-display font-bold mb-6">
              {selectedCivilization.name}
            </h1>
            
            {/* Timeline Component */}
            <Timeline 
              events={events}
              timelineYears={timelineYears}
              placedEvents={placedEvents}
              isVerified={isVerified}
              correctEvents={results.correct}
              incorrectEvents={results.incorrect}
            />
            
            {/* Event Cards */}
            <div className="mb-6">
              <h2 className="text-lg font-display font-semibold mb-4">
                Eventos Históricos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(event => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    isPlaced={Object.keys(placedEvents).includes(event.id)}
                    isCorrect={isVerified && results.correct.includes(event.id)}
                    isIncorrect={isVerified && results.incorrect.includes(event.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Game Controls Sidebar */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
            <div className="bg-parchment-50 border border-parchment-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Control de Juego</h3>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-stone-600 mb-1">
                  <span>Eventos colocados</span>
                  <span>{Object.keys(placedEvents).length}/{events.length}</span>
                </div>
                <div className="w-full bg-parchment-200 rounded-full h-2">
                  <div 
                    className="bg-terracotta-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(Object.keys(placedEvents).length / events.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                {!isVerified ? (
                  <button
                    onClick={handleVerify}
                    disabled={!allEventsPlaced}
                    className={`w-full flex items-center justify-center space-x-2 btn ${
                      allEventsPlaced 
                        ? 'bg-gold-500 hover:bg-gold-600 text-stone-900' 
                        : 'bg-parchment-200 text-stone-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <span>Verificar</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/results/${civilizationId}/${mode}`)}
                    className="w-full flex items-center justify-center space-x-2 btn-primary"
                  >
                    <span>Ver Resultados</span>
                  </button>
                )}
                
                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex items-center justify-center space-x-2 btn-secondary"
                >
                  <span>Reiniciar</span>
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center space-x-2 border border-parchment-300 rounded-md py-2 text-stone-600 hover:bg-parchment-100 transition-colors"
                >
                  <span>Volver al Inicio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;