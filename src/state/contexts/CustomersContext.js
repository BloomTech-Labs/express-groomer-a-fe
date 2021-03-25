import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { APIContext } from './APIContext';
import { FormContext } from './FormContext';
import { UsersContext } from './UsersContext';

export const CustomersContext = createContext({});

const CustomersProvider = ({ children }) => {
  const history = useHistory();
  const [custInfo, setCustInfo] = useState({});
  const [customerAppointments, setCustomerAppointments] = useState();
  const [customerFavorites, setCustomerFavorites] = useState();
  const [updated, setUpdated] = useState(false);
  const { userInfo } = useContext(UsersContext);
  const { deleteProfile } = useContext(APIContext);
  const { setResultInfo } = useContext(FormContext);

  const deleteCustomerProfile = authState => {
    //API call function
    deleteProfile(authState, 'customers', userInfo, history, setResultInfo);
  };

  return (
    <CustomersContext.Provider
      value={{
        custInfo,
        setCustInfo,
        updated,
        setUpdated,
        deleteCustomerProfile,
        customerAppointments,
        setCustomerAppointments,
        customerFavorites,
        setCustomerFavorites,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
