import React from 'react';
import Chat from './ChatModule';
import Carbon from './CarbonEmission';

const EmissionsAndScenarioPage = () => {
  return (
    <div>
      <Carbon />
      <Chat />
    </div>
    
  );
};

export default EmissionsAndScenarioPage;
