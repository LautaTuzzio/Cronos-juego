// Game related types
export type GameMode = 'individual' | 'evaluation';

export interface HistoricalEvent {
  id: string;
  titulo: string;
  anio: string;
  descripcionBreve: string;
  descripcionCompleta: string;
  imagen: string;
  importancia: string;
}

export interface Civilization {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  periodoHistorico: string;
  eventos: HistoricalEvent[];
}

export interface CivilizationProgress {
  individualModeCompleted: number;
  evaluationModeCompleted: number;
  totalEventsCorrect: number;
  totalEventsAttempted: number;
  badges: string[];
  lastPlayed: string;
}

export interface UserProgress {
  completedCivilizations: {
    [key: string]: CivilizationProgress;
  };
  totalPoints: number;
  totalBadges: string[];
}

export interface EventPlacement {
  eventId: string;
  position: number;
  isCorrect: boolean;
}

export interface GameResult {
  civilizationId: string;
  mode: GameMode;
  events: HistoricalEvent[];
  placements: EventPlacement[];
  score: number;
  timeTaken: number;
  hintsUsed: number;
  date: string;
}