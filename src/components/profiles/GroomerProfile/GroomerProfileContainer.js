import React, { useContext, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import GroomerProfilePage from './GroomerProfilePage';
// context imports
import { UsersContext } from '../../../state/contexts/UsersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import { GroomersContext } from '../../../state/contexts/GroomersContext';

const GroomerProfileContainer = () => {
  const { authState } = useOktaAuth();
  //grabbing user info from okta for test purposes
  //all info could/should be grabbed by state if possible
  const { authService } = useOktaAuth();
  const [memoAuthService] = useMemo(() => [authService], [authService]);

  // context state
  const { userInfo, setUserInfo } = useContext(UsersContext);
  const { getLoggedInGroomer } = useContext(APIContext);
  const { updated } = useContext(GroomersContext);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoAuthService]);

  //getGroomer API call
  useEffect(() => {
    getLoggedInGroomer(authState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, updated]);

  return (
    <div>
      <GroomerProfilePage />
    </div>
  );
};

export default GroomerProfileContainer;
