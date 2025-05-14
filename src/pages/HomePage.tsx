import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Clock, Trophy, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const { civilizations, userProgress } = useGame();

  // Get recently played civilizations
  const getRecentCivilizations = () => {
    const civilizationEntries = Object.entries(userProgress.completedCivilizations);
    
    if (civilizationEntries.length === 0) return [];
    
    return civilizationEntries
      .sort((a, b) => {
        const dateA = new Date(a[1].lastPlayed).getTime();
        const dateB = new Date(b[1].lastPlayed).getTime();
        return dateB - dateA;
      })
      .slice(0, 3)
      .map(([id]) => civilizations.find(civ => civ.id === id))
      .filter(Boolean);
  };

  const recentCivilizations = getRecentCivilizations();

  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-stone-900/70">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-100 mb-4">
              CRONOS
            </h1>
            <p className="text-xl text-amber-50/90">
              Viaja por el tiempo y aprende historia ordenando los eventos más significativos
              de las grandes civilizaciones del mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {civilizations.map((civilization) => {
              const progress = userProgress.completedCivilizations[civilization.id];
              const totalEvents = civilization.eventos.length;
              const completedEvents = progress?.totalEventsCorrect || 0;
              const progressPercentage = progress 
                ? Math.round((completedEvents / totalEvents) * 100) 
                : 0;
              
              return (
                <div 
                  key={civilization.id}
                  className="bg-stone-100 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${civilization.imagen})` }}
                  >
                    <div className="h-full w-full bg-gradient-to-t from-stone-900/80 to-transparent p-4 flex flex-col justify-end">
                      <h3 className="text-xl font-serif font-bold text-white">
                        {civilization.nombre}
                      </h3>
                      <p className="text-sm text-stone-200">{civilization.periodoHistorico}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-stone-600 mb-4 line-clamp-2">
                      {civilization.descripcion}
                    </p>

                    {progress ? (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-stone-500 mb-1">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{completedEvents}/{totalEvents} eventos</span>
                          </div>
                          <span>{progressPercentage}%</span>
                        </div>
                        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-600 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="flex items-center text-xs text-stone-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Sin progreso aún</span>
                        </div>
                      </div>
                    )}
                    
                    {progress?.badges && progress.badges.length > 0 && (
                      <div className="flex mb-4">
                        {progress.badges.map((badge, index) => (
                          <div 
                            key={index} 
                            className="h-6 w-6 rounded-full bg-amber-500 mr-1 flex items-center justify-center"
                            title={`Insignia: ${badge}`}
                          >
                            <Trophy className="h-3 w-3 text-white" />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Link
                      to={`/game-modes/${civilization.id}`}
                      className="block w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md text-center transition duration-200 font-medium"
                    >
                      Jugar
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          {recentCivilizations.length > 0 && (
            <div className="bg-stone-800/80 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-serif font-bold text-amber-100 mb-4">
                Continúa Aprendiendo
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentCivilizations.map((civilization) => (
                  civilization && (
                    <Link
                      key={civilization.id}
                      to={`/game-modes/${civilization.id}`}
                      className="flex items-center bg-stone-700/80 hover:bg-stone-600/80 rounded-md p-3 text-stone-100 transition duration-200"
                    >
                      <div 
                        className="h-12 w-12 rounded-md bg-cover bg-center mr-3 flex-shrink-0" 
                        style={{ backgroundImage: `url(${civilization.imagen})` }}
                      ></div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{civilization.nombre}</h3>
                        <p className="text-xs text-stone-300">Continuar jugando</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-stone-400" />
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-amber-700/90 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-serif font-bold text-white">
                  Tabla de Clasificación Global
                </h2>
                <p className="text-amber-100/90">
                  ¡Compite con otros estudiantes y demuestra tu conocimiento histórico!
                </p>
              </div>
              
              <Link
                to="/leaderboard"
                className="bg-white hover:bg-amber-50 text-amber-800 px-6 py-2 rounded-md inline-flex items-center font-medium transition duration-200"
              >
                Ver Clasificación
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;