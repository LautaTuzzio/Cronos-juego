import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, AlignJustify, RotateCcw, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowToPlayPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cómo Jugar | Cronos';
  }, []);

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title text-center">
          Cómo Jugar
        </h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <img 
            src="https://images.pexels.com/photos/2228583/pexels-photo-2228583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Antiguo reloj de sol"
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <h2 className="text-2xl font-display font-bold mb-4">
              Domina la Historia con Cronos
            </h2>
            <p className="text-stone-700 mb-4">
              Cronos es un juego educativo diseñado para fortalecer tu comprensión de la secuencia cronológica
              de eventos históricos significativos. Te desafiará a ordenar correctamente acontecimientos clave
              de distintas civilizaciones y períodos históricos.
            </p>
            <p className="text-stone-700">
              A continuación encontrarás una guía paso a paso para jugar, consejos para mejorar tu puntuación,
              y explicaciones sobre los diferentes modos de juego disponibles.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-display font-bold mb-6">
          Guía Paso a Paso
        </h2>
        
        <div className="space-y-8 mb-12">
          <Step 
            number={1}
            title="Selecciona una Civilización"
            description="En la página principal, encontrarás tarjetas con diferentes civilizaciones y períodos históricos. Selecciona una para comenzar tu juego."
            icon={<AlignJustify className="w-10 h-10 text-terracotta-500" />}
          />
          
          <Step 
            number={2}
            title="Elige un Modo de Juego"
            description="Puedes elegir entre el Modo Individual (práctica personal sin límite de tiempo) o el Modo Evaluación (con tiempo limitado y sin pistas)."
            icon={<CheckSquare className="w-10 h-10 text-terracotta-500" />}
          />
          
          <Step 
            number={3}
            title="Ordena los Eventos en la Línea del Tiempo"
            description="Examina cada evento histórico y colócalo en el lugar correcto de la línea temporal. Puedes hacer clic en cada evento para obtener más información y opciones de años."
            icon={<Clock className="w-10 h-10 text-terracotta-500" />}
          />
          
          <Step 
            number={4}
            title="Verifica tus Respuestas"
            description="Una vez hayas colocado todos los eventos, haz clic en 'Verificar' para evaluar tus respuestas. Los eventos correctos se marcarán en verde y los incorrectos en rojo."
            icon={<CheckSquare className="w-10 h-10 text-terracotta-500" />}
          />
          
          <Step 
            number={5}
            title="Revisa tus Resultados y Aprende"
            description="En la pantalla de resultados, podrás ver tu puntuación, estadísticas de rendimiento, y explicaciones detalladas sobre la cronología correcta y las conexiones entre eventos."
            icon={<RotateCcw className="w-10 h-10 text-terracotta-500" />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-parchment-100 rounded-lg p-6 border border-parchment-300">
            <h3 className="text-xl font-display font-semibold mb-4">
              Consejos para Mejorar
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-2xl text-terracotta-500 mr-2">•</span>
                <span>Estudia el contexto histórico antes de comenzar</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl text-terracotta-500 mr-2">•</span>
                <span>Busca conexiones causales entre eventos</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl text-terracotta-500 mr-2">•</span>
                <span>Presta atención a las descripciones de cada evento</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl text-terracotta-500 mr-2">•</span>
                <span>Consulta la wiki histórica para profundizar</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl text-terracotta-500 mr-2">•</span>
                <span>Practica regularmente con diferentes civilizaciones</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-parchment-100 rounded-lg p-6 border border-parchment-300">
            <h3 className="text-xl font-display font-semibold mb-4">
              Modos de Juego
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg">Modo Individual</h4>
                <p className="text-stone-700 text-sm">
                  Ideal para práctica y aprendizaje. Sin límite de tiempo, con acceso a pistas
                  y posibilidad de cambiar tus respuestas en cualquier momento.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-lg">Modo Evaluación</h4>
                <p className="text-stone-700 text-sm">
                  Diseñado para poner a prueba tus conocimientos en condiciones de examen.
                  Incluye límite de tiempo, sin acceso a pistas y mayor puntuación por respuestas correctas.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-semibold mb-4">
            ¿Listo para el Desafío?
          </h3>
          <Link 
            to="/"
            className="btn-primary inline-flex items-center"
          >
            <span>Comenzar a Jugar</span>
            <ChevronRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon }) => {
  return (
    <motion.div 
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-parchment-200 flex items-center justify-center">
        <span className="text-xl font-bold text-terracotta-700">{number}</span>
      </div>
      <div>
        <div className="flex items-center mb-2">
          {icon}
          <h3 className="text-xl font-medium ml-2">{title}</h3>
        </div>
        <p className="text-stone-700">{description}</p>
      </div>
    </motion.div>
  );
};

export default HowToPlayPage;