import React from 'react';
import GroomerPublicProfile from '../search/SearchResults/GroomerPublicProfile';
import FadeIn from 'react-fade-in';

const GroomerPublicProfilePage = props => {
  return (
    <div>
      <FadeIn delay={200} transitionDuration={650}>
        <GroomerPublicProfile props={props} />
      </FadeIn>
    </div>
  );
};

export default GroomerPublicProfilePage;
