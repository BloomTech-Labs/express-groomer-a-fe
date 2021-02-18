import React, { useEffect, useMemo, useContext } from 'react';
import RenderCustPro from '../../profiles/CustomerProfile/RenderCustPro';
import { useOktaAuth } from '@okta/okta-react';
// context imports
import { UsersContext } from '../../../state/contexts/UsersContext';
import { CustomersContext } from '../../../state/contexts/CustomersContext';
import { APIContext } from '../../../state/contexts/APIContext';

const CustProContainer = () => {
  //grabbing user info from okta for test purposes
  //all info could/should be grabbed by state if possible
  const { authService, authState } = useOktaAuth();
  const [memoAuthService] = useMemo(() => [authService], [authService]);

  // context state
  const { userInfo, setUserInfo } = useContext(UsersContext);
  const { updated } = useContext(CustomersContext);
  const { getCustomerByID } = useContext(APIContext);

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

  //API call to get customer info
  useEffect(() => {
    getCustomerByID(authState, userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, authState, updated]);

  return <RenderCustPro />;
};

export default CustProContainer;
