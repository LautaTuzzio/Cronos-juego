import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Trophy, Clock, HelpCircle, Home, RotateCcw, Share2, BookOpen, ChevronRight } from 'lucide-react';

const ResultsPage = () => {
  const { civilizationId, mode } = useParams<{ civilizationId: string; mode: string }>();
  const gameMode = mode as 'individual' | 'evaluation';
  const location = useLocation();
  const { civilizations } = useGame();
  
  const state = location.state as {
    events: any[];
    score: number;
    correctPlacements: number;
    timeTaken: number;
    hintsUsed: number;
  } | null;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (!state) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Resultados no disponibles</h2>
        <p className="text-stone-600 mb-6">No se han podido cargar los resultados del juego.</p>
        <Link to="/" className="text-amber-700 hover:text-amber-800 font-medium">
          Volver al inicio
        </Link>
      </div>
    );
  }
  
  const { events, score, correctPlacements, timeTaken, hintsUsed } = state;
  
  const civilization = civilizations.find(civ => civ.id === civilizationId);
  
  if (!civilization) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Civilización no encontrada</h2>
        <Link to="/" className="text-amber-700 hover:text-amber-800 font-medium">
          Volver al inicio
        </Link>
      </div>
    );
  }
  
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Sort the events chronologically for the correct timeline
  const sortedEvents = [...civilization.eventos].sort((a, b) => {
    const yearA = parseInt(a.anio);
    const yearB = parseInt(b.anio);
    return yearA - yearB;
  });
  
  // Check if events were placed correctly
  const eventResults = sortedEvents.map(correctEvent => {
    const placedEvent = events.find(e => e.id === correctEvent.id);
    const isCorrect = placedEvent && events.indexOf(placedEvent) === sortedEvents.indexOf(correctEvent);
    
    return {
      ...correctEvent,
      isCorrect
    };
  });
  
  const totalEvents = civilization.eventos.length;
  const accuracy = Math.round((correctPlacements / totalEvents) * 100);
  
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Results summary */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-6">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                ¡Desafío Completado!
              </h1>
              <p className="text-amber-100">
                {civilization.nombre} - Modo {gameMode === 'individual' ? 'Individual' : 'Evaluación'}
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mr-6">
                    <Trophy className="h-8 w-8 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-stone-800">{score}</h2>
                    <p className="text-stone-500">Puntuación final</p>
                  </div>
                </div>
                
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-800">{correctPlacements}/{totalEvents}</div>
                    <p className="text-stone-500 text-sm">Aciertos</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-800">{formatTime(timeTaken)}</div>
                    <p className="text-stone-500 text-sm">Tiempo</p>
                  </div>
                  
                  {gameMode === 'individual' && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">{hintsUsed}</div>
                      <p className="text-stone-500 text-sm">Pistas</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-stone-700 font-medium">Precisión</span>
                  <span className="text-stone-700 font-medium">{accuracy}%</span>
                </div>
                <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      accuracy >= 80 
                        ? 'bg-green-500'
                        : accuracy >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${accuracy}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center space-x-2 md:space-x-4">
                <Link 
                  to="/"
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-md font-medium transition duration-200 flex items-center m-2"
                >
                  <Home className="h-5 w-5 mr-2" />
                  <span>Inicio</span>
                </Link>
                
                <Link 
                  to={`/play/${civilizationId}/${gameMode}`}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-md font-medium transition duration-200 flex items-center m-2"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  <span>Jugar de nuevo</span>
                </Link>
                
                <button 
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-md font-medium transition duration-200 flex items-center m-2"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  <span>Compartir</span>
                </button>
                
                <Link 
                  to={`/wiki/${civilizationId}`}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-md font-medium transition duration-200 flex items-center m-2"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>Aprender más</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Timeline results */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-stone-200">
              <h2 className="text-xl font-serif font-bold text-stone-800">
                Línea Temporal Correcta
              </h2>
              <p className="text-stone-600 text-sm">
                Revisa la colocación correcta de los eventos y aprende más sobre cada uno.
              </p>
            </div>
            
            <div className="px-6 py-4">
              <div className="relative py-8">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-stone-200"></div>
                
                {/* Timeline events */}
                <div className="space-y-12">
                  {eventResults.map((event, index) => (
                    <div key={event.id} className="relative">
                      {/* Timeline dot */}
                      <div className={`absolute left-6 w-5 h-5 rounded-full transform -translate-x-1/2 border-4 border-white ${
                        event.isCorrect 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}></div>
                      
                      {/* Event content */}
                      <div className="ml-12">
                        <div className={`p-4 rounded-lg ${
                          event.isCorrect 
                            ? 'bg-green-50 border border-green-100' 
                            : 'bg-red-50 border border-red-100'
                        }`}>
                          <div className="flex items-start">
                            <div 
                              className="w-20 h-20 rounded-md bg-cover bg-center mr-4 flex-shrink-0" 
                              style={{ backgroundImage: `url(${event.imagen})` }}
                            ></div>
                            
                            <div>
                              <div className="flex items-center mb-1">
                                <span className={`text-sm font-medium px-2 py-0.5 rounded-full mr-2 ${
                                  event.isCorrect 
                                    ? 'bg-green-200 text-green-800' 
                                    : 'bg-red-200 text-red-800'
                                }`}>
                                  {event.anio}
                                </span>
                                <h3 className="text-lg font-medium text-stone-800">
                                  {event.titulo}
                                </h3>
                              </div>
                              
                              <p className="text-stone-700 text-sm mb-3">
                                {event.descripcionBreve}
                              </p>
                              
                              <div className="bg-white bg-opacity-50 p-3 rounded border border-stone-200">
                                <h4 className="text-sm font-medium text-stone-800 mb-1">
                                  Relevancia Histórica:
                                </h4>
                                <p className="text-stone-600 text-sm">
                                  {event.importancia}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < eventResults.length - 1 && (
                          <div className="pl-4 my-2">
                            <div className="h-12 border-l-2 border-dashed border-stone-300"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Next steps */}
          <div className="bg-amber-700 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    ¿Quieres seguir aprendiendo?
                  </h2>
                  <p className="text-amber-100">
                    Descubre más civilizaciones y pon a prueba tus conocimientos.
                  </p>
                </div>
                
                <Link
                  to="/"
                  className="bg-white hover:bg-amber-50 text-amber-800 px-6 py-2 rounded-md inline-flex items-center font-medium transition duration-200"
                >
                  <span>Explorar más civilizaciones</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;