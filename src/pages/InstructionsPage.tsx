import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { ArrowLeft, Clock, HelpCircle, ChevronRight, MoveHorizontal } from 'lucide-react';

const InstructionsPage = () => {
  const { civilizationId, mode } = useParams<{ civilizationId: string; mode: string }>();
  const gameMode = mode as 'individual' | 'evaluation';
  const navigate = useNavigate();
  const { civilizations } = useGame();
  
  const [currentStep, setCurrentStep] = useState(0);
  
  const civilization = civilizations.find(civ => civ.id === civilizationId);
  
  useEffect(() => {
    if (!civilization || !gameMode) {
      navigate('/');
    }
  }, [civilization, gameMode, navigate]);
  
  if (!civilization) {
    return <div>Cargando...</div>;
  }
  
  const handleStartGame = () => {
    navigate(`/play/${civilizationId}/${gameMode}`);
  };
  
  const steps = [
    {
      title: 'Contexto Histórico',
      content: (
        <div>
          <p className="text-stone-700 mb-4">
            {civilization.descripcion}
          </p>
          <p className="text-stone-700 mb-4">
            En esta sesión, aprenderás sobre los eventos más importantes de {civilization.nombre} que ocurrieron durante
            el periodo {civilization.periodoHistorico}.
          </p>
          <p className="text-stone-700 font-medium">
            Ordenarás cronológicamente {civilization.eventos.length} eventos históricos clave.
          </p>
        </div>
      )
    },
    {
      title: 'Cómo Jugar',
      content: (
        <div>
          <p className="text-stone-700 mb-4">
            El objetivo del juego es ordenar correctamente los eventos históricos en la línea temporal.
          </p>
          
          <div className="border border-stone-200 rounded-lg p-4 bg-stone-50 mb-4">
            <h4 className="font-medium text-stone-800 mb-2 flex items-center">
              <MoveHorizontal className="h-5 w-5 mr-2 text-amber-600" />
              Arrastra y Suelta
            </h4>
            <p className="text-stone-700 text-sm">
              Arrastra las tarjetas de eventos desde la sección inferior y suéltalas en la línea temporal en el orden que consideres correcto.
            </p>
          </div>
          
          <div className="border border-stone-200 rounded-lg p-4 bg-stone-50 mb-4">
            <h4 className="font-medium text-stone-800 mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-600" />
              Administra tu Tiempo
            </h4>
            <p className="text-stone-700 text-sm">
              {gameMode === 'evaluation' 
                ? 'En el modo evaluación, tienes un tiempo limitado para ordenar todos los eventos.'
                : 'En el modo individual, no hay límite de tiempo, pero recibirás puntos adicionales por completar la tarea rápidamente.'}
            </p>
          </div>
          
          {gameMode === 'individual' && (
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50">
              <h4 className="font-medium text-stone-800 mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-amber-600" />
                Pistas Disponibles
              </h4>
              <p className="text-stone-700 text-sm">
                Si te atascas, puedes solicitar pistas, pero cada una reducirá tu puntuación final.
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Sistema de Puntuación',
      content: (
        <div>
          <p className="text-stone-700 mb-4">
            Tu puntuación final se calculará en base a los siguientes criterios:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-green-700 font-medium">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-stone-800 mb-1">Precisión</h4>
                <p className="text-stone-700 text-sm">
                  100 puntos por cada evento colocado correctamente.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Clock className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium text-stone-800 mb-1">Tiempo</h4>
                <p className="text-stone-700 text-sm">
                  Hasta 500 puntos adicionales basados en la rapidez con la que completes el desafío.
                </p>
              </div>
            </div>
            
            {gameMode === 'individual' && (
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <HelpCircle className="h-4 w-4 text-red-700" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 mb-1">Pistas</h4>
                  <p className="text-stone-700 text-sm">
                    Cada pista utilizada resta 50 puntos de tu puntuación final.
                  </p>
                </div>
              </div>
            )}
            
            {gameMode === 'evaluation' && (
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-700 font-medium">2x</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 mb-1">Bonificación de Evaluación</h4>
                  <p className="text-stone-700 text-sm">
                    ¡Tu puntuación final se duplica en el modo evaluación!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to={`/game-modes/${civilizationId}`} 
          className="flex items-center text-amber-700 hover:text-amber-800 mb-8 transition duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Volver a modos de juego</span>
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-amber-700 px-6 py-4">
              <h1 className="text-2xl font-serif font-bold text-white">
                {civilization.nombre}
              </h1>
              <p className="text-amber-100">
                Modo {gameMode === 'individual' ? 'Individual' : 'Evaluación'}
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex mb-8">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`flex flex-col items-center cursor-pointer ${
                        index > 0 ? 'flex-1' : ''
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        currentStep >= index 
                          ? 'bg-amber-700 text-white' 
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        {index + 1}
                      </div>
                      <p className={`text-xs mt-2 text-center ${
                        currentStep >= index 
                          ? 'text-amber-700 font-medium' 
                          : 'text-stone-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="flex-1 flex items-center">
                        <div className={`h-1 w-full ${
                          currentStep > index 
                            ? 'bg-amber-700' 
                            : 'bg-stone-200'
                        }`}></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
                  {steps[currentStep].title}
                </h2>
                
                {steps[currentStep].content}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    currentStep === 0
                      ? 'text-stone-400 cursor-not-allowed'
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                  disabled={currentStep === 0}
                >
                  Anterior
                </button>
                
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md font-medium transition duration-200"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleStartGame}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition duration-200 flex items-center"
                  >
                    <span>Comenzar Desafío</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;