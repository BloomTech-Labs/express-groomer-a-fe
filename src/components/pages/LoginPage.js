import React from 'react';
import FadeIn from 'react-fade-in';
import LoginContainer from '../forms/LoginForm/LoginContainer';

const LoginPage = () => {
  return (
    <div>
      <FadeIn delay={0} transitionDuration={500}>
        <LoginContainer />
      </FadeIn>
    </div>
  );
};

export default LoginPage;
