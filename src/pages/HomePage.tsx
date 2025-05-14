import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Trophy } from 'lucide-react';
import CivilizationGrid from '../components/home/CivilizationGrid';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cronos - Juego Educativo de Historia';
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/1280px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg" 
            alt="Antiguo Coliseo Romano" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Clock className="w-20 h-20 mx-auto text-gold-500 mb-6" />
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-6">
              CRONOS
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Viaja por el tiempo y pon a prueba tus conocimientos históricos ordenando 
              cronológicamente los eventos más importantes de cada civilización.
            </p>
            <a 
              href="#civilizaciones" 
              className="btn-primary text-lg px-8 py-3 inline-block"
            >
              Comenzar Aventura
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-parchment-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center text-stone-800 mb-12">
            Descubre el Pasado de Forma Interactiva
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon={<Clock className="w-12 h-12 text-terracotta-500" />}
              title="Cronología Interactiva"
              description="Ordena eventos históricos en una línea del tiempo y aprende sobre su secuencia y relaciones."
            />
            <Feature 
              icon={<BookOpen className="w-12 h-12 text-terracotta-500" />}
              title="Contenido Educativo"
              description="Explora información detallada sobre cada evento histórico con explicaciones contextuales."
            />
            <Feature 
              icon={<Trophy className="w-12 h-12 text-terracotta-500" />}
              title="Seguimiento de Progreso"
              description="Mide tu conocimiento histórico con puntuaciones y estadísticas de rendimiento."
            />
          </div>
        </div>
      </section>
      
      {/* Civilizations Section */}
      <section id="civilizaciones" className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center text-stone-800 mb-4">
            Explora Civilizaciones
          </h2>
          <p className="text-center text-stone-600 mb-12 max-w-3xl mx-auto">
            Selecciona una civilización histórica para poner a prueba tus conocimientos.
            Cada una contiene eventos únicos y desafiantes para ordenar.
          </p>
          
          <CivilizationGrid />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-terracotta-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            ¿Listo para Poner a Prueba tus Conocimientos Históricos?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Sumérgete en la historia, aprende mientras juegas y compite contra tus amigos.
          </p>
          <a 
            href="#civilizaciones" 
            className="btn bg-white text-terracotta-600 hover:bg-parchment-100 text-lg px-8 py-3 inline-block"
          >
            Comenzar Ahora
          </a>
        </div>
      </section>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold text-stone-800 mb-3">
        {title}
      </h3>
      <p className="text-stone-600">
        {description}
      </p>
    </motion.div>
  );
};

export default HomePage;