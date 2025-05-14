import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Users, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sobre Nosotros | Cronos';
  }, []);

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title text-center mb-8">
          Sobre Cronos
        </h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Muse_clio.jpg/800px-Muse_clio.jpg" 
            alt="Clio, la musa de la historia"
            className="w-full h-72 object-cover"
          />
          
          <div className="p-6">
            <h2 className="text-2xl font-display font-bold mb-4">
              Nuestra Misión Educativa
            </h2>
            <p className="text-stone-700 mb-4">
              Cronos nació de la convicción de que el aprendizaje de la historia puede y debe ser una 
              experiencia atractiva y significativa para los estudiantes. Nuestra misión es transformar 
              la manera en que se enseña y aprende la cronología histórica, utilizando la gamificación 
              como herramienta pedagógica.
            </p>
            <p className="text-stone-700 mb-4">
              Creemos firmemente que comprender la secuencia temporal de los acontecimientos históricos 
              es fundamental para establecer conexiones entre eventos, reconocer patrones, y desarrollar 
              un pensamiento crítico sobre nuestro pasado colectivo.
            </p>
            <p className="text-stone-700">
              Trabajamos en estrecha colaboración con docentes, historiadores y especialistas en 
              aprendizaje digital para crear una herramienta educativa que sea tanto rigurosa en su 
              contenido como atractiva en su forma.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-parchment-50 rounded-lg p-6 border border-parchment-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-4">
              <BookOpen className="w-10 h-10 text-terracotta-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  Enfoque Pedagógico
                </h3>
                <p className="text-stone-700">
                  Nuestro enfoque se basa en los principios del aprendizaje activo, 
                  donde el estudiante participa directamente en la construcción de su conocimiento.
                  Mediante la ordenación cronológica, el análisis contextual y la retroalimentación 
                  inmediata, Cronos promueve la comprensión profunda de los procesos históricos.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h4 className="font-medium mb-2">Objetivos pedagógicos:</h4>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                <li>Fortalecer la comprensión de secuencias cronológicas</li>
                <li>Promover el reconocimiento de relaciones causa-efecto</li>
                <li>Facilitar la contextualización histórica</li>
                <li>Estimular el aprendizaje activo</li>
                <li>Fomentar la retención a largo plazo</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-parchment-50 rounded-lg p-6 border border-parchment-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-4">
              <Users className="w-10 h-10 text-terracotta-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  Nuestro Equipo
                </h3>
                <p className="text-stone-700">
                  Somos un equipo multidisciplinario de educadores, historiadores, 
                  diseñadores y desarrolladores comprometidos con la innovación educativa.
                  Nos une la pasión por la historia y la convicción de que la tecnología 
                  puede enriquecer significativamente la experiencia de aprendizaje.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-md p-4 shadow-sm">
                <h4 className="font-medium mb-2">Historiadores</h4>
                <p className="text-sm text-stone-600">
                  Seleccionan eventos relevantes y garantizan la precisión histórica
                </p>
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <h4 className="font-medium mb-2">Educadores</h4>
                <p className="text-sm text-stone-600">
                  Diseñan la experiencia de aprendizaje y los sistemas de evaluación
                </p>
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <h4 className="font-medium mb-2">Diseñadores</h4>
                <p className="text-sm text-stone-600">
                  Crean la interfaz visual y experiencia de usuario
                </p>
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <h4 className="font-medium mb-2">Desarrolladores</h4>
                <p className="text-sm text-stone-600">
                  Implementan las funcionalidades y aseguran el rendimiento técnico
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="bg-terracotta-500 text-white rounded-lg overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-display font-bold mb-4">
              Nuestro Compromiso
            </h2>
            <p className="mb-4">
              Nos comprometemos a ofrecer:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2 text-2xl">•</span>
                <span>Contenido histórico riguroso y actualizado</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-2xl">•</span>
                <span>Experiencia de usuario atractiva y accesible</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-2xl">•</span>
                <span>Adaptación a diferentes estilos y contextos de aprendizaje</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-2xl">•</span>
                <span>Mejora continua basada en la retroalimentación de usuarios</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-2xl">•</span>
                <span>Respeto por la diversidad cultural e histórica</span>
              </li>
            </ul>
            <p>
              Creemos que el conocimiento histórico es una herramienta fundamental para 
              comprender nuestro presente y construir nuestro futuro.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">
            Contáctanos
          </h2>
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-10 h-10 text-terracotta-500 mr-3" />
            <a href="mailto:info@cronos.edu" className="text-lg text-terracotta-600 hover:underline">
              info@cronos.edu
            </a>
          </div>
          <p className="text-stone-700">
            Estamos siempre abiertos a sugerencias, colaboraciones y comentarios que nos ayuden 
            a mejorar la experiencia educativa de Cronos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;