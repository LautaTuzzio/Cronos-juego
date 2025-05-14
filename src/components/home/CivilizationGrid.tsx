import React from 'react';
import CivilizationCard from './CivilizationCard';
import civilizations from '../../data/civilizations';

const CivilizationGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {civilizations.map((civilization, index) => (
        <CivilizationCard 
          key={civilization.id} 
          civilization={civilization} 
          index={index}
        />
      ))}
    </div>
  );
};

export default CivilizationGrid;