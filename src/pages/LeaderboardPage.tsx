import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Medal, Filter } from 'lucide-react';

// Mock data for leaderboard
const leaderboardData = [
  { id: 1, username: 'HistoriaFan2005', score: 9850, civilizations: ['roma', 'grecia', 'francia'], badges: 12 },
  { id: 2, username: 'CronologiaMaestro', score: 9720, civilizations: ['roma', 'grecia', 'francia'], badges: 10 },
  { id: 3, username: 'TiempoVerdad', score: 9500, civilizations: ['roma', 'grecia'], badges: 8 },
  { id: 4, username: 'HistoriaExplorador', score: 9200, civilizations: ['roma', 'grecia'], badges: 7 },
  { id: 5, username: 'PasadoPresente', score: 8950, civilizations: ['roma', 'francia'], badges: 6 },
  { id: 6, username: 'EventoExacto', score: 8800, civilizations: ['roma'], badges: 5 },
  { id: 7, username: 'TiempoViajero', score: 8650, civilizations: ['grecia', 'francia'], badges: 4 },
  { id: 8, username: 'CronoMaster', score: 8400, civilizations: ['roma'], badges: 3 },
  { id: 9, username: 'HistoriaGuru', score: 8200, civilizations: ['francia'], badges: 3 },
  { id: 10, username: 'TiempoCazador', score: 8000, civilizations: ['grecia'], badges: 2 },
];

// Mock class data
const classData = [
  { id: 'clase-3b', name: 'Clase 3°B Historia Mundial', students: 28 },
  { id: 'clase-4a', name: 'Clase 4°A Historia Antigua', students: 25 },
  { id: 'clase-3c', name: 'Clase 3°C Ciencias Sociales', students: 30 },
];

const LeaderboardPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('global');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    if (filter !== 'class') {
      setSelectedClass(null);
    }
  };
  
  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
  };
  
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="flex items-center text-amber-700 hover:text-amber-800 mb-8 transition duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Volver al inicio</span>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-700 rounded-lg shadow-md mb-8">
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 text-amber-100 mr-3" />
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  Tabla de Clasificación
                </h1>
              </div>
              <p className="text-amber-100">
                Descubre quién domina la historia. Compite con otros estudiantes y demuestra tu conocimiento.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* Filters */}
            <div className="p-4 border-b border-stone-200">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-stone-400 mr-2" />
                <h2 className="text-lg font-medium text-stone-800 mr-4">
                  Filtros:
                </h2>
                
                <div className="flex flex-wrap">
                  <button
                    onClick={() => handleFilterChange('global')}
                    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 md:mb-0 ${
                      selectedFilter === 'global'
                        ? 'bg-amber-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Global
                  </button>
                  
                  <button
                    onClick={() => handleFilterChange('roma')}
                    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 md:mb-0 ${
                      selectedFilter === 'roma'
                        ? 'bg-amber-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Imperio Romano
                  </button>
                  
                  <button
                    onClick={() => handleFilterChange('grecia')}
                    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 md:mb-0 ${
                      selectedFilter === 'grecia'
                        ? 'bg-amber-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Antigua Grecia
                  </button>
                  
                  <button
                    onClick={() => handleFilterChange('francia')}
                    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 md:mb-0 ${
                      selectedFilter === 'francia'
                        ? 'bg-amber-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Revolución Francesa
                  </button>
                  
                  <button
                    onClick={() => handleFilterChange('class')}
                    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 md:mb-0 ${
                      selectedFilter === 'class'
                        ? 'bg-amber-600 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Por Clase
                  </button>
                </div>
              </div>
              
              {selectedFilter === 'class' && (
                <div className="mt-4 pl-7">
                  <div className="flex flex-wrap">
                    {classData.map(classItem => (
                      <button
                        key={classItem.id}
                        onClick={() => handleClassChange(classItem.id)}
                        className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center ${
                          selectedClass === classItem.id
                            ? 'bg-amber-600 text-white' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <Users className="h-3 w-3 mr-1" />
                        <span>{classItem.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Leaderboard table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Posición
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Estudiante
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Puntuación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Insignias
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {leaderboardData
                    .filter(user => {
                      if (selectedFilter === 'global') return true;
                      if (selectedFilter === 'class') return true; // In a real app, would filter by class
                      return user.civilizations.includes(selectedFilter);
                    })
                    .map((user, index) => (
                      <tr key={user.id} className={index < 3 ? 'bg-amber-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {index < 3 ? (
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                                index === 0 
                                  ? 'bg-amber-200 text-amber-800' 
                                  : index === 1 
                                    ? 'bg-stone-200 text-stone-800' 
                                    : 'bg-amber-600/20 text-amber-800'
                              }`}>
                                <Medal className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full flex items-center justify-center mr-2 text-stone-600 font-medium">
                                {index + 1}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-stone-900">
                            {user.username}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-stone-900 font-bold">
                            {user.score.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            {Array.from({ length: Math.min(5, user.badges) }).map((_, i) => (
                              <div 
                                key={i}
                                className="h-6 w-6 rounded-full bg-amber-500 -ml-1 first:ml-0 flex items-center justify-center"
                                style={{ zIndex: 5 - i }}
                              >
                                <Trophy className="h-3 w-3 text-white" />
                              </div>
                            ))}
                            
                            {user.badges > 5 && (
                              <div className="ml-1 text-xs text-stone-600 flex items-center">
                                +{user.badges - 5} más
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center text-sm text-stone-500">
            <p>La tabla de clasificación se actualiza cada 24 horas.</p>
            <p>Último actualización: 15/04/2025 a las 08:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;