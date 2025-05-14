import React, { createContext, useState, useContext, ReactNode } from 'react';
import civilizations, { Civilization, Event } from '../data/civilizations';

interface GameState {
  // Current game state
  selectedCivilization: Civilization | null;
  gameMode: 'individual' | 'evaluation' | null;
  events: Event[];
  placedEvents: Record<string, string>; // eventId -> year position
  isGameComplete: boolean;
  results: {
    correct: string[]; // Array of correct event IDs
    incorrect: string[]; // Array of incorrect event IDs
    score: number;
    totalTime: number;
  };
  
  // Game progress tracking
  progressByGame: Record<string, {
    civilizationId: string;
    mode: string;
    score: number;
    date: string;
  }[]>;
  bestProgressByCivilization: Record<string, number>;
}

interface GameContextType extends GameState {
  selectCivilization: (id: string) => void;
  selectGameMode: (mode: 'individual' | 'evaluation') => void;
  startGame: () => void;
  placeEvent: (eventId: string, position: string) => void;
  removeEvent: (eventId: string) => void;
  verifyEvents: () => void;
  resetGame: () => void;
}

const defaultGameState: GameState = {
  selectedCivilization: null,
  gameMode: null,
  events: [],
  placedEvents: {},
  isGameComplete: false,
  results: {
    correct: [],
    incorrect: [],
    score: 0,
    totalTime: 0,
  },
  progressByGame: {},
  bestProgressByCivilization: {},
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  const selectCivilization = (id: string) => {
    const civilization = civilizations.find(civ => civ.id === id) || null;
    setGameState(prev => ({
      ...prev,
      selectedCivilization: civilization,
      events: [],
      placedEvents: {},
      isGameComplete: false,
      results: {
        correct: [],
        incorrect: [],
        score: 0,
        totalTime: 0,
      },
    }));
  };

  const selectGameMode = (mode: 'individual' | 'evaluation') => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
    }));
  };

  const startGame = () => {
    if (!gameState.selectedCivilization) return;
    
    // Shuffle events for the game
    const shuffledEvents = [...gameState.selectedCivilization.events]
      .sort(() => Math.random() - 0.5);
    
    setGameState(prev => ({
      ...prev,
      events: shuffledEvents,
      placedEvents: {},
      isGameComplete: false,
      results: {
        correct: [],
        incorrect: [],
        score: 0,
        totalTime: 0,
      },
    }));
  };

  const placeEvent = (eventId: string, position: string) => {
    setGameState(prev => ({
      ...prev,
      placedEvents: {
        ...prev.placedEvents,
        [eventId]: position,
      },
    }));
  };

  const removeEvent = (eventId: string) => {
    const { [eventId]: _, ...remainingEvents } = gameState.placedEvents;
    setGameState(prev => ({
      ...prev,
      placedEvents: remainingEvents,
    }));
  };

  const verifyEvents = () => {
    if (!gameState.selectedCivilization) return;
    
    const correct: string[] = [];
    const incorrect: string[] = [];
    
    // Check each placed event
    Object.entries(gameState.placedEvents).forEach(([eventId, placedPosition]) => {
      const event = gameState.events.find(e => e.id === eventId);
      if (event && event.year === placedPosition) {
        correct.push(eventId);
      } else {
        incorrect.push(eventId);
      }
    });
    
    // Calculate score - each correct answer is worth 100 points
    const score = correct.length * 100;
    
    // Record the game result
    const gameRecord = {
      civilizationId: gameState.selectedCivilization.id,
      mode: gameState.gameMode || 'individual',
      score: score,
      date: new Date().toISOString(),
    };
    
    // Update best progress for this civilization if applicable
    const currentCivId = gameState.selectedCivilization.id;
    const currentBest = gameState.bestProgressByCivilization[currentCivId] || 0;
    const newBest = Math.max(currentBest, correct.length);
    
    setGameState(prev => ({
      ...prev,
      isGameComplete: true,
      results: {
        correct,
        incorrect,
        score,
        totalTime: 0, // In a real app, we would track time
      },
      progressByGame: {
        ...prev.progressByGame,
        [currentCivId]: [
          ...(prev.progressByGame[currentCivId] || []),
          gameRecord,
        ],
      },
      bestProgressByCivilization: {
        ...prev.bestProgressByCivilization,
        [currentCivId]: newBest,
      },
    }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      events: [],
      placedEvents: {},
      isGameComplete: false,
      results: {
        correct: [],
        incorrect: [],
        score: 0,
        totalTime: 0,
      },
    }));
  };

  const value = {
    ...gameState,
    selectCivilization,
    selectGameMode,
    startGame,
    placeEvent,
    removeEvent,
    verifyEvents,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}