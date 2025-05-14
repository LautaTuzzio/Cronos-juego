import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, Brain, GraduationCap, Clock, ChevronRight } from 'lucide-react';

const GameModesPage = () => {
  const { civilizationId } = useParams<{ civilizationId: string }>();
  const navigate = useNavigate();
  const { civilizations } = useGame();

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

  const handleModeSelect = (mode: 'individual' | 'evaluation') => {
    navigate(`/instructions/${civilizationId}/${mode}`);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${civilization.imagen})` 
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="flex items-center text-amber-300 hover:text-amber-200 mb-8 transition duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Volver al inicio</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-900/80 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-100 mb-3">
              {civilization.nombre}
            </h1>
            <p className="text-stone-300 mb-2">
              <span className="text-amber-300">{civilization.periodoHistorico}</span>
            </p>
            <p className="text-stone-200 leading-relaxed mb-4">
              {civilization.descripcion}
            </p>
            <p className="text-stone-400 text-sm">
              {civilization.eventos.length} eventos históricos para ordenar
            </p>
          </div>

          <h2 className="text-2xl font-serif font-bold text-amber-100 mb-6 text-center">
            Selecciona un Modo de Juego
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Modo Individual */}
            <div 
              onClick={() => handleModeSelect('individual')}
              className="bg-stone-800/90 backdrop-blur-sm rounded-lg p-6 shadow-lg cursor-pointer hover:bg-stone-700/90 transition duration-300 border-2 border-transparent hover:border-amber-600"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-amber-700/30 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-amber-100 mb-2 text-center">
                Modo Individual
              </h3>
              
              <p className="text-stone-300 text-center mb-4">
                Practica a tu ritmo sin límite de tiempo
              </p>
              
              <ul className="text-sm text-stone-400 space-y-2 mb-6">
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Sin límite de tiempo</span>
                </li>
                <li className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Acceso a pistas (con penalización)</span>
                </li>
                <li className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Explicaciones detalladas</span>
                </li>
              </ul>
              
              <div className="flex justify-center">
                <button 
                  className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-2 rounded-md font-medium transition duration-200 flex items-center"
                >
                  <span>Seleccionar</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>

            {/* Modo Evaluación */}
            <div 
              onClick={() => handleModeSelect('evaluation')}
              className="bg-stone-800/90 backdrop-blur-sm rounded-lg p-6 shadow-lg cursor-pointer hover:bg-stone-700/90 transition duration-300 border-2 border-transparent hover:border-amber-600"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-amber-700/30 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-amber-100 mb-2 text-center">
                Modo Evaluación
              </h3>
              
              <p className="text-stone-300 text-center mb-4">
                Pon a prueba tus conocimientos con límite de tiempo
              </p>
              
              <ul className="text-sm text-stone-400 space-y-2 mb-6">
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Límite de tiempo</span>
                </li>
                <li className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Sin acceso a pistas</span>
                </li>
                <li className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Puntuación doble</span>
                </li>
              </ul>
              
              <div className="flex justify-center">
                <button 
                  className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-2 rounded-md font-medium transition duration-200 flex items-center"
                >
                  <span>Seleccionar</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to={`/wiki/${civilizationId}`}
              className="text-amber-300 hover:text-amber-200 text-sm font-medium transition duration-200"
            >
              ¿Quieres aprender más sobre esta civilización? Ver Wiki
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModesPage;