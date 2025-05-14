import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../data/civilizations';
import { useGame } from '../../context/GameContext';

interface TimelineProps {
  events: Event[];
  timelineYears: string[];
  placedEvents: Record<string, string>;
  isVerified: boolean;
  correctEvents: string[];
  incorrectEvents: string[];
}

const Timeline: React.FC<TimelineProps> = ({ 
  events, 
  timelineYears, 
  placedEvents, 
  isVerified,
  correctEvents,
  incorrectEvents
}) => {
  const { removeEvent } = useGame();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle mouse events for dragging the timeline
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    setIsScrolling(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsScrolling(false), 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  // Clean up event listeners
  useEffect(() => {
    const cleanup = () => {
      setIsDragging(false);
      setIsScrolling(false);
    };
    
    window.addEventListener('mouseup', cleanup);
    return () => window.removeEventListener('mouseup', cleanup);
  }, []);

  // Format year to display BCE/CE
  const formatYear = (year: string) => {
    const numYear = parseInt(year);
    return numYear < 0 
      ? `${Math.abs(numYear)} a.C.`
      : `${numYear} d.C.`;
  };

  // Generate year markers with dynamic spacing
  const yearMarkers = () => {
    return timelineYears.map(year => {
      // Check if we have events placed at this year
      const eventsAtYear = Object.entries(placedEvents)
        .filter(([_, placedYear]) => placedYear === year)
        .map(([eventId]) => eventId);

      // If there's already an event at this year, don't allow more
      const hasEvent = eventsAtYear.length > 0;
      
      return (
        <div 
          key={year} 
          className="relative flex-shrink-0 flex flex-col items-center mx-6"
        >
          {/* Year marker */}
          <div className="timeline-marker"></div>
          <div className="text-sm font-medium mt-2">{formatYear(year)}</div>
          
          {/* Event cards placed at this year */}
          <div className="mt-4 space-y-3 w-48">
            {eventsAtYear.map(eventId => {
              const event = events.find(e => e.id === eventId);
              if (!event) return null;
              
              // Determine color based on verification status
              let borderColor = 'border-parchment-300';
              if (isVerified) {
                if (correctEvents.includes(eventId)) {
                  borderColor = 'border-green-500';
                } else if (incorrectEvents.includes(eventId)) {
                  borderColor = 'border-red-500';
                }
              }
              
              return (
                <motion.div 
                  key={eventId}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-3 bg-white rounded-md shadow-md border-2 ${borderColor} text-center cursor-pointer hover:shadow-lg transition-all`}
                  onClick={() => !isVerified && removeEvent(eventId)}
                >
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  {isVerified && incorrectEvents.includes(eventId) && (
                    <p className="text-xs mt-1 text-red-500">
                      Año correcto: {formatYear(event.year)}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div 
      className="w-full overflow-hidden border-b border-parchment-300 pb-2 mb-6"
      onMouseLeave={handleMouseUp}
    >
      <div className="text-lg font-display font-semibold mb-2">Línea del tiempo</div>
      
      <div 
        ref={timelineRef}
        className="timeline-container cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="timeline-track my-4"></div>
        <div className="flex min-w-max pb-6">
          {yearMarkers()}
        </div>
      </div>
      <p className="text-sm text-stone-500 italic">
        {isScrolling ? "Arrastrando..." : "Arrastra para explorar la línea del tiempo"}
      </p>
    </div>
  );
};

export default Timeline;