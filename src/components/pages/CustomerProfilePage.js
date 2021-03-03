import React from 'react';
import CustomerProContainer from '../profiles/CustomerProfile/CustProContainer';
import FadeIn from 'react-fade-in';

const CustomerProfilePage = () => {
  return (
    <div>
      <FadeIn delay={200} transitionDuration={650}>
        <CustomerProContainer />
      </FadeIn>
    </div>
  );
};

export default CustomerProfilePage;
