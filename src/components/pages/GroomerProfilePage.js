import React from 'react';
import GroomerProfileContainer from '../profiles/GroomerProfile/GroomerProfileContainer';
import FadeIn from 'react-fade-in';

const GroomerProfilePage = () => {
  return (
    <div>
      <FadeIn delay={200} transitionDuration={650}>
        <GroomerProfileContainer />
      </FadeIn>
    </div>
  );
};

export default GroomerProfilePage;
