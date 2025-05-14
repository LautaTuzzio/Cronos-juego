import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Clock, BookOpen, Calendar, Filter } from 'lucide-react';
import { useGame } from '../context/GameContext';
import civilizations from '../data/civilizations';

interface LeaderboardEntry {
  id: string;
  name: string;
  civilizationId: string;
  civilizationName: string;
  score: number;
  date: string;
  mode: string;
}

const LeaderboardPage: React.FC = () => {
  const { progressByGame } = useGame();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [filterCivilization, setFilterCivilization] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<string>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tabla de Clasificación | Cronos';
  }, []);
  
  useEffect(() => {
    // Transform progress data into leaderboard format
    const entries: LeaderboardEntry[] = [];
    
    Object.entries(progressByGame).forEach(([civilizationId, games]) => {
      const civilization = civilizations.find(civ => civ.id === civilizationId);
      if (!civilization) return;
      
      games.forEach((game, index) => {
        entries.push({
          id: `${civilizationId}-${index}`,
          name: `Jugador Anónimo`, // In a real app, this would be the player's name
          civilizationId,
          civilizationName: civilization.name,
          score: game.score,
          date: new Date(game.date).toLocaleDateString(),
          mode: game.mode
        });
      });
    });
    
    // Sort by score (highest first)
    entries.sort((a, b) => b.score - a.score);
    
    setLeaderboardData(entries);
  }, [progressByGame]);
  
  // Apply filters
  const filteredData = leaderboardData.filter(entry => {
    const matchesCivilization = filterCivilization === 'all' || entry.civilizationId === filterCivilization;
    const matchesMode = filterMode === 'all' || entry.mode === filterMode;
    return matchesCivilization && matchesMode;
  });
  
  // Generate mock data if no real entries exist
  const displayData = filteredData.length > 0 ? filteredData : generateMockData();
  
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center">
            Tabla de Clasificación
          </h1>
          
          <div className="bg-gold-400/10 border border-gold-500/30 rounded-lg p-6 mb-8 text-center">
            <Trophy className="w-16 h-16 text-gold-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-stone-800 mb-2">
              Los Maestros de la Historia
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Aquí se muestran las mejores puntuaciones obtenidas por los jugadores 
              de Cronos. ¿Podrás superar estos récords y demostrar tu dominio de la historia?
            </p>
          </div>
        </motion.div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <h3 className="text-lg font-semibold flex items-center mb-3 sm:mb-0">
              <Filter size={18} className="mr-2 text-terracotta-500" />
              Filtros
            </h3>
            
            <span className="text-sm text-stone-500">
              {filteredData.length} resultados encontrados
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="civilization-filter" className="block text-sm font-medium text-stone-700 mb-1">
                Civilización
              </label>
              <select
                id="civilization-filter"
                value={filterCivilization}
                onChange={(e) => setFilterCivilization(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-terracotta-500 focus:border-terracotta-500"
              >
                <option value="all">Todas las civilizaciones</option>
                {civilizations.map(civ => (
                  <option key={civ.id} value={civ.id}>{civ.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="mode-filter" className="block text-sm font-medium text-stone-700 mb-1">
                Modo de Juego
              </label>
              <select
                id="mode-filter"
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-terracotta-500 focus:border-terracotta-500"
              >
                <option value="all">Todos los modos</option>
                <option value="individual">Modo Individual</option>
                <option value="evaluation">Modo Evaluación</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-parchment-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                    Jugador
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                    Civilización
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                    Modo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                    Puntuación
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-700 uppercase tracking-wider">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {displayData.map((entry, index) => (
                  <tr 
                    key={entry.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index < 3 ? (
                        <MedalIcon position={index + 1} />
                      ) : (
                        <span className="text-stone-500 font-medium">{index + 1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-stone-800">{entry.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-stone-700">{entry.civilizationName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        entry.mode === 'evaluation' 
                          ? 'bg-gold-100 text-gold-800' 
                          : 'bg-terracotta-100 text-terracotta-800'
                      }`}>
                        {entry.mode === 'evaluation' ? 'Evaluación' : 'Individual'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-terracotta-600">{entry.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-stone-500">
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="bg-parchment-50 border border-parchment-300 rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-terracotta-500 mr-3" />
              <h3 className="text-xl font-display font-semibold">Logros por Civilización</h3>
            </div>
            <p className="text-stone-700 mb-4">
              Los logros muestran tu progreso en cada civilización. Completa todas las civilizaciones 
              para convertirte en un maestro de la historia.
            </p>
            <div className="space-y-3">
              {civilizations.map(civ => (
                <div key={civ.id} className="flex justify-between items-center">
                  <span className="font-medium">{civ.name}</span>
                  <div className="w-32 bg-stone-200 rounded-full h-2.5">
                    <div 
                      className="bg-terracotta-500 h-2.5 rounded-full" 
                      style={{ width: `${civ.bestProgress ? (civ.bestProgress / civ.events.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-parchment-50 border border-parchment-300 rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 text-terracotta-500 mr-3" />
              <h3 className="text-xl font-display font-semibold">Estadísticas Globales</h3>
            </div>
            <p className="text-stone-700 mb-4">
              Estas estadísticas muestran el rendimiento global de todos los jugadores en Cronos.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Civilización más popular</h4>
                <div className="flex justify-between items-center">
                  <span>Imperio Romano</span>
                  <span className="text-terracotta-600 font-semibold">48% de juegos</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Evento más difícil</h4>
                <div className="flex justify-between items-center">
                  <span>Establecimiento de la República Romana</span>
                  <span className="text-terracotta-600 font-semibold">67% de error</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Puntuación media</h4>
                <div className="flex justify-between items-center">
                  <span>Todos los jugadores</span>
                  <span className="text-terracotta-600 font-semibold">350 puntos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const MedalIcon: React.FC<{ position: number }> = ({ position }) => {
  let color = "";
  let icon = null;
  
  switch (position) {
    case 1:
      color = "text-gold-500";
      icon = <Trophy size={24} />;
      break;
    case 2:
      color = "text-stone-400";
      icon = <Medal size={20} />;
      break;
    case 3:
      color = "text-amber-600";
      icon = <Medal size={20} />;
      break;
    default:
      color = "text-stone-600";
      icon = position;
  }
  
  return <div className={`font-bold ${color}`}>{icon}</div>;
};

// Generate mock data for demonstration
function generateMockData(): LeaderboardEntry[] {
  const names = [
    "María García", "Pablo Rodríguez", "Ana Martínez", "Carlos López", 
    "Lucía Fernández", "David Sánchez", "Carmen Gómez", "Miguel Torres"
  ];
  
  const dates = [
    "01/03/2025", "28/02/2025", "25/02/2025", "20/02/2025",
    "15/02/2025", "10/02/2025", "05/02/2025", "01/02/2025"
  ];
  
  return civilizations.flatMap((civ, i) => {
    return ["individual", "evaluation"].map((mode, j) => {
      const index = i * 2 + j;
      return {
        id: `mock-${index}`,
        name: names[index % names.length],
        civilizationId: civ.id,
        civilizationName: civ.name,
        score: 700 - (index * 50) + Math.floor(Math.random() * 30),
        date: dates[index % dates.length],
        mode: mode
      };
    });
  }).sort((a, b) => b.score - a.score).slice(0, 10);
}

export default LeaderboardPage;