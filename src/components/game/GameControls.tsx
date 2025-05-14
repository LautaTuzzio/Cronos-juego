import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, RotateCcw, Home } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface GameControlsProps {
  eventsPlaced: number;
  totalEvents: number;
  isComplete: boolean;
  onVerify: () => void;
  isVerified: boolean;
  civilizationId: string;
  gameMode: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  eventsPlaced,
  totalEvents,
  isComplete,
  onVerify,
  isVerified,
  civilizationId,
  gameMode
}) => {
  const { resetGame } = useGame();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Control de Juego</h3>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-stone-600 mb-1">
          <span>Eventos colocados</span>
          <span>{eventsPlaced}/{totalEvents}</span>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div 
            className="bg-terracotta-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(eventsPlaced / totalEvents) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-3">
        {!isVerified ? (
          <button
            onClick={onVerify}
            disabled={!isComplete}
            className={`w-full flex items-center justify-center space-x-2 btn ${
              isComplete 
                ? 'bg-gold-500 hover:bg-gold-600 text-stone-900' 
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'
            } transition-colors`}
          >
            <CheckCircle size={18} />
            <span>Verificar</span>
          </button>
        ) : (
          <button
            onClick={() => navigate(`/results/${civilizationId}/${gameMode}`)}
            className="w-full flex items-center justify-center space-x-2 btn-primary"
          >
            <span>Ver Resultados</span>
          </button>
        )}
        
        <button
          onClick={resetGame}
          className="w-full flex items-center justify-center space-x-2 btn-secondary"
        >
          <RotateCcw size={18} />
          <span>Reiniciar</span>
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center space-x-2 border border-stone-300 rounded-md py-2 text-stone-600 hover:bg-stone-100 transition-colors"
        >
          <Home size={18} />
          <span>Volver al Inicio</span>
        </button>
      </div>
    </div>
  );
};

export default GameControls;