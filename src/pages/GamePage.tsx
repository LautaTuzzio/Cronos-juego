import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Clock, HelpCircle, ChevronLeft, CheckCircle } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HistoricalEvent } from '../types';

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const DndBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

const GamePage = () => {
  const { civilizationId, mode } = useParams<{ civilizationId: string; mode: string }>();
  const gameMode = mode as 'individual' | 'evaluation';
  const navigate = useNavigate();
  const { civilizations, startGame, currentGameState, useHint, endGame } = useGame();
  
  const [placedEvents, setPlacedEvents] = useState<(HistoricalEvent | null)[]>([]);
  const [availableEvents, setAvailableEvents] = useState<HistoricalEvent[]>([]);
  const [gameTime, setGameTime] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const gameStartTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!civilizationId || !gameMode) {
      navigate('/');
      return;
    }
    
    const civilization = civilizations.find(civ => civ.id === civilizationId);
    if (!civilization) {
      navigate('/');
      return;
    }
    
    startGame(civilizationId, gameMode);
    setAvailableEvents(civilization.eventos.slice().sort(() => Math.random() - 0.5));
    setPlacedEvents(Array(civilization.eventos.length).fill(null));
    gameStartTimeRef.current = Date.now();
    
    timerRef.current = window.setInterval(() => {
      if (gameStartTimeRef.current) {
        setGameTime(Math.floor((Date.now() - gameStartTimeRef.current) / 1000));
      }
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [civilizationId, gameMode]);
  
  const handleRequestHint = () => {
    if (gameMode === 'evaluation') return;
    useHint();
  };
  
  const handleVerifyPlacement = () => {
    if (placedEvents.some(event => event === null)) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const timeTaken = Date.now() - (gameStartTimeRef.current || Date.now());
    const sortedEvents = [...placedEvents].filter(Boolean) as HistoricalEvent[];
    
    const result = endGame(sortedEvents, timeTaken);
    
    navigate(`/results/${civilizationId}/${gameMode}`, { 
      state: { 
        events: sortedEvents,
        score: result.score,
        correctPlacements: result.correctPlacements,
        timeTaken,
        hintsUsed: currentGameState.hintsUsed
      } 
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const civilization = civilizations.find(civ => civ.id === civilizationId);
  
  if (!civilization) {
    return <div>Cargando...</div>;
  }
  
  return (
    <DndProvider backend={DndBackend}>
      <div className="min-h-screen bg-stone-100 py-4 px-2 md:px-6">
        <div className="mb-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(`/game-modes/${civilizationId}`)}
            className="flex items-center text-amber-700 hover:text-amber-800 transition duration-200"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Regresar</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-stone-700">
              <Clock className="h-5 w-5 mr-1" />
              <span className="font-medium">{formatTime(gameTime)}</span>
            </div>
            
            {gameMode === 'individual' && (
              <button 
                onClick={handleRequestHint}
                className="flex items-center text-amber-600 hover:text-amber-700 transition duration-200"
                title="Solicitar pista (penalización de 50 puntos)"
              >
                <HelpCircle className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Pista</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-2">
            {civilization.nombre}
          </h1>
          <p className="text-stone-600">{civilization.periodoHistorico}</p>
        </div>
        
        <div className="bg-[url('https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg')] bg-cover rounded-lg p-4 md:p-6 mb-6 shadow-md">
          <h2 className="text-xl font-serif font-bold text-amber-800 mb-4">
            Línea de Tiempo
          </h2>
          
          <div className="relative">
            <div className="absolute left-0 right-0 h-1 bg-amber-800/50 top-1/2 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-5 gap-2 md:gap-4 relative z-10">
              {placedEvents.map((event, index) => (
                <TimelineSlot 
                  key={index} 
                  index={index} 
                  event={event}
                  onRemove={() => {
                    if (event) {
                      const newPlacedEvents = [...placedEvents];
                      newPlacedEvents[index] = null;
                      setPlacedEvents(newPlacedEvents);
                      setAvailableEvents([...availableEvents, event]);
                      setIsGameComplete(false);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
            Eventos Históricos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                index={index}
                onPlace={(timelineIndex) => {
                  if (placedEvents[timelineIndex] !== null) return false;
                  
                  const newPlacedEvents = [...placedEvents];
                  newPlacedEvents[timelineIndex] = event;
                  
                  setPlacedEvents(newPlacedEvents);
                  setAvailableEvents(availableEvents.filter(e => e.id !== event.id));
                  
                  if (availableEvents.length === 1) {
                    setIsGameComplete(true);
                  }
                  
                  return true;
                }}
              />
            ))}
          </div>
        </div>
        
        {isGameComplete && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleVerifyPlacement}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Verificar Ordenamiento</span>
            </button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

interface EventCardProps {
  event: HistoricalEvent;
  index: number;
  onPlace: (timelineIndex: number) => boolean;
}

const EventCard = ({ event, index, onPlace }: EventCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div
      ref={drag}
      className={`bg-white rounded-md shadow-md overflow-hidden cursor-grab transition duration-200 ${
        isDragging ? 'opacity-50 scale-105' : 'hover:shadow-lg hover:scale-[1.02]'
      }`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div 
        className="h-32 bg-cover bg-center" 
        style={{ backgroundImage: `url(${event.imagen})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-stone-900/80 to-transparent p-3 flex flex-col justify-end">
          <h3 className="text-lg font-medium text-white">
            {event.titulo}
          </h3>
        </div>
      </div>
      
      {showDetails && (
        <div className="p-3 bg-stone-50">
          <p className="text-sm text-stone-700">
            {event.descripcionBreve}
          </p>
        </div>
      )}
    </div>
  );
};

interface TimelineSlotProps {
  index: number;
  event: HistoricalEvent | null;
  onRemove: () => void;
}

const TimelineSlot = ({ index, event, onRemove }: TimelineSlotProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item: { index: number }) => {
      return { timelineIndex: index, success: true };
    },
    canDrop: () => event === null,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  
  return (
    <div
      ref={drop}
      className={`rounded-md transition duration-200 ${
        isOver && canDrop
          ? 'bg-amber-100'
          : event
            ? 'bg-white'
            : 'bg-stone-200'
      }`}
    >
      <div className="flex justify-center mb-2">
        <div className={`w-4 h-4 rounded-full ${
          event ? 'bg-amber-600' : 'bg-stone-400'
        } relative z-20`}></div>
      </div>
      
      {event ? (
        <div 
          className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer transition duration-200 hover:shadow-lg"
          onClick={onRemove}
        >
          <div 
            className="h-20 sm:h-24 md:h-28 bg-cover bg-center" 
            style={{ backgroundImage: `url(${event.imagen})` }}
          >
            <div className="h-full w-full bg-gradient-to-t from-stone-900/80 to-transparent p-2 flex flex-col justify-end">
              <h3 className="text-sm font-medium text-white line-clamp-2">
                {event.titulo}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={`h-20 sm:h-24 md:h-28 border-2 border-dashed rounded-md flex items-center justify-center ${
          isOver && canDrop
            ? 'border-amber-400 bg-amber-50'
            : 'border-stone-300'
        }`}>
          {isOver && canDrop ? (
            <p className="text-xs text-amber-600 text-center px-2">Soltar aquí</p>
          ) : (
            <p className="text-xs text-stone-500 text-center px-2">Arrastra un evento aquí</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage;