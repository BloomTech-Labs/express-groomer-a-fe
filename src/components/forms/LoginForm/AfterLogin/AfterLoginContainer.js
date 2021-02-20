import React, { useContext, useEffect } from 'react';
import { UsersContext } from '../../../../state/contexts/UsersContext';
import { useHistory } from 'react-router-dom';

const AfterLogin = () => {
  const history = useHistory();
  const { userRole } = useContext(UsersContext);

  useEffect(() => {
    setTimeout(() => {
      switch (userRole) {
        case 'groomer':
          history.push('/groomer-dashboard');
          break;
        case 'customer':
          history.push('/customer-dashboard');
          break;
        default:
          history.push('/info');
          break;
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  return <div></div>;
};

export default AfterLogin;
