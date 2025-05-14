import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Search, Home, RotateCcw } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Página No Encontrada | Cronos';
  }, []);

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Clock className="w-24 h-24 mx-auto text-terracotta-400 mb-6" />
          <h1 className="text-5xl font-display font-bold text-stone-800 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-display font-semibold text-stone-700 mb-6">
            Evento histórico no encontrado
          </h2>
          <p className="text-stone-600 max-w-lg mx-auto mb-8">
            Parece que te has aventurado fuera de la línea temporal.
            La página que buscas se ha perdido en los anales de la historia
            o quizás nunca existió.
          </p>
        </motion.div>
        
        <div className="bg-parchment-50 border border-parchment-300 rounded-lg p-6 mb-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-terracotta-500 mr-2" />
            <h3 className="text-lg font-medium">¿Qué pudo haber ocurrido?</h3>
          </div>
          
          <ul className="text-left space-y-2 text-stone-700 mb-6">
            <li className="flex items-start">
              <span className="text-xl text-terracotta-500 mr-2">•</span>
              <span>La URL podría haber sido escrita incorrectamente</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl text-terracotta-500 mr-2">•</span>
              <span>El contenido podría haber sido movido o eliminado</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl text-terracotta-500 mr-2">•</span>
              <span>Quizás has descubierto una anomalía en el continuo espacio-tiempo</span>
            </li>
          </ul>
          
          <p className="text-sm text-stone-500 italic">
            Incluso los mejores historiadores a veces se pierden en el tiempo.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/"
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Home size={18} />
            <span>Volver al Inicio</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <RotateCcw size={18} />
            <span>Regresar a la Página Anterior</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;