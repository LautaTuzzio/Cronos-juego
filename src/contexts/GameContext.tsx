import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Civilization, GameMode, UserProgress } from '../types';
import mockData from '../data/mockData';

interface GameContextType {
  civilizations: Civilization[];
  userProgress: UserProgress;
  currentGameState: {
    civilizationId: string | null;
    mode: GameMode | null;
    events: any[] | null;
    startTime: number | null;
    hintsUsed: number;
  };
  startGame: (civilizationId: string, mode: GameMode) => void;
  endGame: (placements: any[], timeTaken: number) => { score: number; correctPlacements: number };
  useHint: () => void;
}

const defaultGameState = {
  civilizationId: null,
  mode: null,
  events: null,
  startTime: null,
  hintsUsed: 0,
};

// Mock user progress data
const mockUserProgress: UserProgress = {
  completedCivilizations: {
    roma: {
      individualModeCompleted: 2,
      evaluationModeCompleted: 1,
      totalEventsCorrect: 15,
      totalEventsAttempted: 18,
      badges: ['roma_beginner'],
      lastPlayed: new Date().toISOString(),
    },
    grecia: {
      individualModeCompleted: 1,
      evaluationModeCompleted: 0,
      totalEventsCorrect: 5,
      totalEventsAttempted: 10,
      badges: [],
      lastPlayed: new Date().toISOString(),
    },
  },
  totalPoints: 850,
  totalBadges: ['global_explorer', 'roma_beginner'],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [civilizations] = useState<Civilization[]>(mockData.civilizaciones);
  const [userProgress] = useState<UserProgress>(mockUserProgress);
  const [currentGameState, setCurrentGameState] = useState(defaultGameState);

  const startGame = (civilizationId: string, mode: GameMode) => {
    const civilization = civilizations.find(civ => civ.id === civilizationId);
    
    if (!civilization) return;
    
    // Shuffle events for game
    const shuffledEvents = [...civilization.eventos].sort(() => Math.random() - 0.5);
    
    setCurrentGameState({
      civilizationId,
      mode,
      events: shuffledEvents,
      startTime: Date.now(),
      hintsUsed: 0,
    });
  };

  const useHint = () => {
    setCurrentGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
  };

  const endGame = (placements: any[], timeTaken: number) => {
    const civilization = civilizations.find(civ => civ.id === currentGameState.civilizationId);
    
    if (!civilization) return { score: 0, correctPlacements: 0 };
    
    // Calculate correct placements
    const correctPlacements = placements.filter((placement, index) => {
      const correctYear = civilization.eventos[index].anio;
      return placement.anio === correctYear;
    }).length;
    
    // Calculate score based on correct placements, time, and hints used
    const baseScore = correctPlacements * 100;
    const timeBonus = Math.max(0, 500 - Math.floor(timeTaken / 1000)); // Time bonus decreases as time increases
    const hintPenalty = currentGameState.hintsUsed * 50;
    
    const totalScore = Math.max(0, baseScore + timeBonus - hintPenalty);
    
    // Reset game state
    setCurrentGameState(defaultGameState);
    
    return {
      score: totalScore,
      correctPlacements,
    };
  };

  return (
    <GameContext.Provider
      value={{
        civilizations,
        userProgress,
        currentGameState,
        startGame,
        endGame,
        useHint,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};