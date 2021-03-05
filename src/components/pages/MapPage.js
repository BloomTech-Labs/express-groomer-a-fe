import React from 'react';
import FadeIn from 'react-fade-in';
import GroomerMap from '../maps/GroomerMap';

const MapPage = () => {
  return (
    <div>
      <FadeIn delay={1000} transitionDuration={1850}>
        <GroomerMap />
      </FadeIn>
    </div>
  );
};

export default MapPage;
