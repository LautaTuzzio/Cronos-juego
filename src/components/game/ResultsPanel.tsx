import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { Event } from '../../data/civilizations';

interface ResultsPanelProps {
  score: number;
  correct: string[];
  incorrect: string[];
  allEvents: Event[];
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  score, 
  correct, 
  incorrect, 
  allEvents 
}) => {
  const totalEvents = allEvents.length;
  const percentCorrect = Math.round((correct.length / totalEvents) * 100);
  
  // Format year to display BCE/CE
  const formatYear = (year: string) => {
    const numYear = parseInt(year);
    return numYear < 0 
      ? `${Math.abs(numYear)} a.C.`
      : `${numYear} d.C.`;
  };
  
  // Determine feedback message based on score
  const getFeedbackMessage = () => {
    if (percentCorrect === 100) {
      return "¡Perfecto! Dominas completamente este período histórico.";
    } else if (percentCorrect >= 80) {
      return "¡Excelente trabajo! Tienes un gran conocimiento de este período.";
    } else if (percentCorrect >= 60) {
      return "¡Buen trabajo! Has demostrado un conocimiento sólido.";
    } else if (percentCorrect >= 40) {
      return "Tienes conocimientos básicos. Con práctica mejorarás rápidamente.";
    } else {
      return "Este período representa un reto para ti. ¡Sigue estudiando!";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-parchment-100 p-6 border-b border-parchment-300">
        <h2 className="text-2xl font-display font-bold text-stone-800 mb-2">
          Resultados
        </h2>
        <p className="text-stone-600">{getFeedbackMessage()}</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-around items-center mb-8">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-4 sm:mb-0"
          >
            <p className="text-stone-600 mb-1">Puntuación Total</p>
            <p className="text-4xl font-display font-bold text-terracotta-600">
              {score}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-4 sm:mb-0"
          >
            <p className="text-stone-600 mb-1">Precisión</p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-gold-500 flex items-center justify-center">
                <p className="text-xl font-bold text-stone-800">{percentCorrect}%</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-stone-600 mb-1">Eventos Correctos</p>
            <p className="text-2xl font-bold text-green-600">{correct.length} <span className="text-stone-400">/ {totalEvents}</span></p>
          </motion.div>
        </div>
        
        <div className="border-t border-stone-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Detalles de los Eventos</h3>
          
          {incorrect.length > 0 && (
            <div className="mb-6">
              <h4 className="flex items-center text-md font-medium text-red-600 mb-2">
                <XCircle size={18} className="mr-2" />
                Eventos con fecha incorrecta
              </h4>
              <div className="space-y-3">
                {incorrect.map(eventId => {
                  const event = allEvents.find(e => e.id === eventId);
                  if (!event) return null;
                  
                  return (
                    <div 
                      key={eventId} 
                      className="p-3 bg-red-50 border border-red-200 rounded-md"
                    >
                      <div className="flex items-center">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-12 h-12 object-cover rounded-md mr-3" 
                        />
                        <div>
                          <h5 className="font-medium">{event.title}</h5>
                          <p className="text-sm text-stone-600">
                            Fecha correcta: <span className="font-semibold">{formatYear(event.year)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {correct.length > 0 && (
            <div>
              <h4 className="flex items-center text-md font-medium text-green-600 mb-2">
                <CheckCircle size={18} className="mr-2" />
                Eventos con fecha correcta
              </h4>
              <div className="space-y-3">
                {correct.map(eventId => {
                  const event = allEvents.find(e => e.id === eventId);
                  if (!event) return null;
                  
                  return (
                    <div 
                      key={eventId} 
                      className="p-3 bg-green-50 border border-green-200 rounded-md"
                    >
                      <div className="flex items-center">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-12 h-12 object-cover rounded-md mr-3" 
                        />
                        <div>
                          <h5 className="font-medium">{event.title}</h5>
                          <p className="text-sm text-stone-600">
                            Fecha: <span className="font-semibold">{formatYear(event.year)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="flex items-center justify-center text-gold-600 mb-2">
            <Award size={20} className="mr-2" />
            <span className="font-medium">Aprende más para mejorar tu puntuación</span>
          </p>
          <p className="text-sm text-stone-500">
            Explora el blog histórico para conocer más detalles sobre cada evento
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;