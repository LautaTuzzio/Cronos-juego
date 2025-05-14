import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, Calendar, Info, ExternalLink } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const WikiPage = () => {
  const { civilizationId, eventId } = useParams<{ civilizationId?: string; eventId?: string }>();
  const { civilizations } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  
  // If no civilization is selected, show the wiki home page
  if (!civilizationId) {
    return <WikiHomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
  }
  
  const civilization = civilizations.find(civ => civ.id === civilizationId);
  
  if (!civilization) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Civilización no encontrada</h2>
        <Link to="/wiki" className="text-amber-700 hover:text-amber-800 font-medium">
          Volver a la Wiki
        </Link>
      </div>
    );
  }
  
  // If no event is selected, show the civilization page
  if (!eventId) {
    return <CivilizationPage civilization={civilization} />;
  }
  
  // Show the event page
  const event = civilization.eventos.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Evento no encontrado</h2>
        <Link to={`/wiki/${civilizationId}`} className="text-amber-700 hover:text-amber-800 font-medium">
          Volver a {civilization.nombre}
        </Link>
      </div>
    );
  }
  
  return <EventPage civilization={civilization} event={event} />;
};

interface WikiHomePageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const WikiHomePage = ({ searchQuery, setSearchQuery }: WikiHomePageProps) => {
  const { civilizations } = useGame();
  
  const filteredCivilizations = civilizations.filter(civ => 
    civ.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    civ.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
          <div className="bg-[url('/images/ancient-library.jpg')] bg-cover bg-center rounded-lg shadow-md mb-8">
            <div className="bg-stone-900/70 backdrop-blur-sm rounded-lg p-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-amber-100 mr-3" />
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  Wiki Histórica
                </h1>
              </div>
              <p className="text-amber-100 mb-6">
                Explora civilizaciones y eventos que han moldeado nuestra historia. Aprende sobre los momentos más importantes de cada época.
              </p>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar civilizaciones y eventos..."
                  className="w-full py-3 px-4 pl-10 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
            Civilizaciones
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredCivilizations.map(civilization => (
              <Link 
                key={civilization.id} 
                to={`/wiki/${civilization.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-200 hover:shadow-lg transform hover:translate-y-[-2px]"
              >
                <div 
                  className="h-40 bg-cover bg-center" 
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
                  <p className="text-sm text-stone-600 mb-4 line-clamp-3">
                    {civilization.descripcion}
                  </p>
                  
                  <div className="flex items-center text-amber-700 text-sm font-medium">
                    <span>Explorar</span>
                    <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="flex items-center text-lg font-medium text-amber-800 mb-2">
              <Info className="h-5 w-5 mr-2" />
              <span>¿Cómo utilizar la Wiki?</span>
            </h3>
            <p className="text-amber-700 mb-4">
              Esta Wiki contiene información detallada sobre las civilizaciones y eventos históricos incluidos en el juego Cronos.
              Puedes utilizarla para:
            </p>
            <ul className="text-amber-700 space-y-1 mb-4 list-disc list-inside">
              <li>Aprender más sobre cada civilización</li>
              <li>Entender el contexto histórico de los eventos</li>
              <li>Descubrir las conexiones entre diferentes momentos históricos</li>
              <li>Prepararte para los desafíos del juego</li>
            </ul>
            <p className="text-amber-700">
              Utiliza la barra de búsqueda para encontrar rápidamente civilizaciones o eventos específicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CivilizationPageProps {
  civilization: any;
}

const CivilizationPage = ({ civilization }: CivilizationPageProps) => {
  // Sort events chronologically
  const sortedEvents = [...civilization.eventos].sort((a, b) => {
    const yearA = parseInt(a.anio);
    const yearB = parseInt(b.anio);
    return yearA - yearB;
  });
  
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/wiki" 
          className="flex items-center text-amber-700 hover:text-amber-800 mb-8 transition duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Volver a la Wiki</span>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="h-64 bg-cover bg-center rounded-t-lg" 
            style={{ backgroundImage: `url(${civilization.imagen})` }}
          >
            <div className="h-full w-full bg-gradient-to-t from-stone-900/90 to-transparent p-8 flex flex-col justify-end rounded-t-lg">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                {civilization.nombre}
              </h1>
              <p className="text-lg text-amber-100">{civilization.periodoHistorico}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-b-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
              Contexto Histórico
            </h2>
            <p className="text-stone-700 leading-relaxed mb-6">
              {civilization.descripcion}
              {/* Extended description would be here in a real application */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
              nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, 
              nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt.
            </p>
            
            <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
              Principales Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-50 p-4 rounded-lg">
                <h3 className="font-medium text-stone-800 mb-2">Organización Política</h3>
                <p className="text-stone-600 text-sm">
                  Descripción de la estructura política y de gobierno que caracterizaba a esta civilización.
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg">
                <h3 className="font-medium text-stone-800 mb-2">Economía</h3>
                <p className="text-stone-600 text-sm">
                  Principales actividades económicas, comercio y sistemas de producción.
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg">
                <h3 className="font-medium text-stone-800 mb-2">Religión</h3>
                <p className="text-stone-600 text-sm">
                  Creencias religiosas, deidades principales y prácticas rituales.
                </p>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg">
                <h3 className="font-medium text-stone-800 mb-2">Arte y Cultura</h3>
                <p className="text-stone-600 text-sm">
                  Manifestaciones artísticas, logros culturales y avances científicos.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              <Link
                to={`/game-modes/${civilization.id}`}
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md font-medium transition duration-200"
              >
                Jugar con esta civilización
              </Link>
            </div>
          </div>
          
          <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
            Cronología de Eventos
          </h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* Timeline */}
            <div className="relative py-8 px-6">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-200"></div>
              
              {/* Timeline events */}
              <div className="space-y-12">
                {sortedEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-8 w-4 h-4 rounded-full bg-amber-600 border-4 border-white transform -translate-x-1/2"></div>
                    
                    {/* Event content */}
                    <div className="ml-16">
                      <Link 
                        to={`/wiki/${civilization.id}/${event.id}`}
                        className="block bg-stone-50 hover:bg-amber-50 rounded-lg p-4 transition duration-200"
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 mr-2">
                            {event.anio}
                          </span>
                          <h3 className="text-lg font-medium text-stone-800">
                            {event.titulo}
                          </h3>
                        </div>
                        
                        <p className="text-stone-700">
                          {event.descripcionBreve}
                        </p>
                        
                        <div className="flex items-center text-amber-700 text-sm font-medium mt-2">
                          <span>Leer más</span>
                          <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
                        </div>
                      </Link>
                      
                      {index < sortedEvents.length - 1 && (
                        <div className="pl-4 my-2">
                          <div className="h-12 border-l-2 border-dashed border-amber-200"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EventPageProps {
  civilization: any;
  event: any;
}

const EventPage = ({ civilization, event }: EventPageProps) => {
  // Find related events (just for demonstration, in a real app would be more sophisticated)
  const relatedEvents = civilization.eventos
    .filter(e => e.id !== event.id)
    .slice(0, 2);
  
  // Format year for display
  const formattedYear = event.anio.startsWith('-') 
    ? `${event.anio.substring(1)} a.C.`
    : `${event.anio} d.C.`;
  
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to={`/wiki/${civilization.id}`} 
          className="flex items-center text-amber-700 hover:text-amber-800 mb-8 transition duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Volver a {civilization.nombre}</span>
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div 
              className="h-64 bg-cover bg-center" 
              style={{ backgroundImage: `url(${event.imagen})` }}
            >
              <div className="h-full w-full bg-gradient-to-t from-stone-900/90 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-amber-300 mr-2" />
                  <span className="text-amber-300 font-medium">{formattedYear}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {event.titulo}
                </h1>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-stone-500 text-sm mb-6">
                <span>{civilization.nombre}</span>
                <span className="mx-2">•</span>
                <span>{formattedYear}</span>
              </div>
              
              <div className="prose max-w-none">
                <h2>Descripción</h2>
                <p className="text-stone-700">
                  {event.descripcionCompleta}
                </p>
                
                <h2>Importancia Histórica</h2>
                <p className="text-stone-700">
                  {event.importancia}
                </p>
                
                {/* Extended content would be here in a real application */}
                <h2>Contexto</h2>
                <p className="text-stone-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
                  nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, 
                  nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                </p>
                
                <h2>Consecuencias</h2>
                <p className="text-stone-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
                  nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt.
                </p>
              </div>
            </div>
          </div>
          
          {relatedEvents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-serif font-bold text-stone-800 mb-4">
                Eventos Relacionados
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedEvents.map(relatedEvent => (
                  <Link
                    key={relatedEvent.id}
                    to={`/wiki/${civilization.id}/${relatedEvent.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition duration-200 hover:shadow-lg"
                  >
                    <div className="flex">
                      <div 
                        className="w-1/3 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${relatedEvent.imagen})` }}
                      ></div>
                      <div className="w-2/3 p-4">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 mr-2">
                            {relatedEvent.anio.startsWith('-') 
                              ? `${relatedEvent.anio.substring(1)} a.C.`
                              : `${relatedEvent.anio} d.C.`}
                          </span>
                        </div>
                        <h3 className="font-medium text-stone-800 mb-1 line-clamp-1">
                          {relatedEvent.titulo}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2">
                          {relatedEvent.descripcionBreve}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="flex items-center text-lg font-medium text-amber-800 mb-2">
              <Info className="h-5 w-5 mr-2" />
              <span>Recursos Adicionales</span>
            </h3>
            <ul className="text-amber-700 space-y-2">
              <li className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a href="#" className="hover:underline">Artículo completo en Wikipedia</a>
              </li>
              <li className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a href="#" className="hover:underline">Video documental sobre este evento</a>
              </li>
              <li className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a href="#" className="hover:underline">Galería de imágenes históricas</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPage;