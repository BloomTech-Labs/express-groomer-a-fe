import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

const NotFoundPage = () => {
  return (
    <div>
      <FadeIn delay={100} transitionDuration={650}>
        <h1>404 Page Not Found</h1>
        <Link to="/">
          <button>Back To Home</button>
        </Link>
      </FadeIn>
    </div>
  );
};

export default NotFoundPage;
