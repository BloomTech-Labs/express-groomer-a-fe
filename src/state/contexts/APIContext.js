import React, { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// context imports
import { UsersContext } from './UsersContext';
import { GroomersContext } from './GroomersContext';
import { CustomersContext } from './CustomersContext';
import { FormContext } from './FormContext';

export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  const history = useHistory();
  const { userInfo, setIsRegistered } = useContext(UsersContext);
  const {
    setCustInfo,
    setCustomerAppointments,
    setCustomerFavorites,
  } = useContext(CustomersContext);

  const {
    setGroomerInfo,
    setGroomerServices,
    setGroomer,
    setAllGroomers,
    setServices,
    service,
    setRating,
    setRatingAverage,
    setRatingCount,
    setGroomerAppointments,
  } = useContext(GroomersContext);
  const {
    setIsEditing,
    isEditing,
    setIsDeleted,
    setShowDelModal,
    setIsError,
    setResultInfo,
    setTarget,
  } = useContext(FormContext);

  // we will define a bunch of API calls here.
  const apiUrl = `${process.env.REACT_APP_API_URI}`;

  const sleep = time =>
    new Promise(resolve => {
      setTimeout(resolve, time);
    });

  //example of non-auth API call function
  const getExampleData = () => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
      .then(response => response.data);
  };

  //reusable GET functions (auth not required)
  const getGroomerServicesByID = id => {
    return axios
      .get(`${process.env.REACT_APP_API_URI}/groomer_services/${id}`)
      .then(res => {
        console.log(res);
        setGroomerServices(res.data);
      })
      .catch(err => {
        console.log('Groomer services by ID error', err);
      });
  };

  const getGroomers = () => {
    return axios
      .get(`${process.env.REACT_APP_API_URI}/groomers`)
      .then(res => {
        setAllGroomers(res.data);
      })
      .catch(err => {
        console.log('Get Groomers Error', err);
      });
  };

  const getGroomerByID = pathway => {
    return axios
      .get(`${process.env.REACT_APP_API_URI}/groomers/${pathway}`)
      .then(res => {
        setGroomer(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLoggedInGroomer = authState => {
    const headers = getAuthHeader(authState);

    return axios
      .get(`${process.env.REACT_APP_API_URI}/groomers/${userInfo.sub}`, {
        headers,
      })
      .then(res => {
        if (res.data) {
          console.log('successful logged in groomer profile data', res.data);
          setGroomerInfo(res.data);
          setIsRegistered(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //AUTH

  const getAuthHeader = authState => {
    if (!authState.isAuthenticated) {
      throw new Error('Not authenticated');
    }
    return { Authorization: `Bearer ${authState.idToken}` };
  };

  const apiAuthGet = authHeader => {
    return axios.get(`${apiUrl}/profiles`, { headers: authHeader });
  };

  //Various GET (auth) API calls

  const getLatLng = async address => {
    const formatted_address = address.split(' ').join('+');
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/?q=${formatted_address}&format=json`
    );
    const latLng = [res.data[0].lat, res.data[0].lon];
    return latLng;
  };

  const getProfileData = authState => {
    try {
      return apiAuthGet(getAuthHeader(authState)).then(
        response => response.data
      );
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  };

  //used to obtain okta user id to set role
  const getUserID = (url, authState) => {
    // here's another way you can compose together your API calls.
    // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
    const headers = getAuthHeader(authState);
    if (!url) {
      throw new Error('No URL provided');
    }
    return axios
      .get(url, { headers })
      .then(res => res.data)
      .catch(err => err);
  };

  //CUSTOMER/PET OWNER GET CALLS
  const getCustomerByID = authState => {
    const headers = getAuthHeader(authState);

    return axios
      .get(`${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}`, {
        headers,
      })
      .then(res => {
        if (res.data) {
          setCustInfo(res.data);
          setIsRegistered(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //GROOMER PROFILE FORM FUNCTIONS
  //User can be groomer or pet owner
  const postUserInfo = (url, authState, infoValues) => {
    const headers = getAuthHeader(authState);
    if (!url) {
      throw new Error('No URL provided');
    }
    return axios
      .post(url, infoValues, { headers })
      .then(res => {
        setResultInfo({
          message: `${res.data.message} You will be redirected shortly`,
          type: 'success',
        });
        setTimeout(() => {
          history.go(0);
        }, 4000);
      })
      .catch(err => {
        setResultInfo({ message: err.message, type: 'error' });
      });
  };

  const putUserInfo = async (url, authState, infoValues) => {
    const headers = getAuthHeader(authState);
    if (!url) {
      throw new Error('No URL provided');
    }
    return axios
      .put(url, infoValues, { headers })
      .then(res => {
        setResultInfo({ message: res.data.message, type: 'success' });
      })
      .then(() => {
        setTimeout(() => {
          setResultInfo({ message: null, type: null });
        }, 3000);
      })
      .catch(err => {
        setResultInfo({ message: err.message, type: 'error' });
      });
  };

  const deleteProfile = (
    authState,
    userType,
    userInfo,
    history,
    setStateVar
  ) => {
    const headers = getAuthHeader(authState);

    return axios
      .delete(`${process.env.REACT_APP_API_URI}/${userType}/${userInfo.sub}`, {
        headers,
      })
      .then(res => {
        history.push('/login');
      })
      .catch(err => {
        setStateVar({ message: err.message, type: 'error' });
      });
  };

  //GROOMER SERVICE SPECIFIC FUNCTIONS
  const postGroomerServices = (url, authState, serviceValues, setStateVar) => {
    const headers = getAuthHeader(authState);
    if (!url) {
      throw new Error('No URL provided');
    }
    return axios
      .post(url, serviceValues, { headers })
      .then(res => {
        setStateVar({ message: res.data.message, type: 'success' });
      })
      .catch(err => {
        setStateVar({ message: err.message, type: 'error' });
      });
  };

  const editGroomerServices = (authState, price) => {
    const headers = getAuthHeader(authState);
    return axios
      .put(
        `${process.env.REACT_APP_API_URI}/groomer_services/${userInfo.sub}?service=${service.id}`,
        price,
        { headers }
      )
      .then(res => {
        setIsEditing(!isEditing);
      })
      .catch(err => {
        setIsError(true);
      });
  };

  const deleteService = (authState, service) => {
    const headers = getAuthHeader(authState);

    return axios
      .delete(
        `${process.env.REACT_APP_API_URI}/groomer_services/${userInfo.sub}?service=${service.id}`,
        { headers }
      )
      .then(res => {
        setIsDeleted(true);
        setShowDelModal(false);
      })
      .catch(err => {
        setIsError(true);
      });
  };

  // API call to get all services
  const getServices = () => {
    return axios
      .get(`${process.env.REACT_APP_API_URI}/services`)
      .then(res => {
        setServices(res.data);
      })
      .catch(err => {
        console.log('Get services error', err);
      });
  };

  const getGroomerRatesByID = pathway => {
    return axios
      .get(`${process.env.REACT_APP_API_URI}/groomers/${pathway}/ratings`)
      .then(res => {
        setRating(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const postRating = (pathway, payload) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URI}/groomers/${pathway}/ratings/${userInfo.sub}`,
        payload
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getGroomerRatingAverageByID = pathway => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URI}/groomers/${pathway}/ratings/average`
      )
      .then(res => {
        setRatingAverage(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getGroomerRatingCountByID = pathway => {
    return axios
      .get(`${process.env.REACT_APP_API_URI}/groomers/${pathway}/ratings/count`)
      .then(res => {
        setRatingCount(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Scheduling Appointments

  const postAppointment = (authState, pathway, values) => {
    const headers = getAuthHeader(authState);

    return axios
      .post(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/customerSchedule/${pathway}`,
        values,
        { headers }
      )
      .then(res => {
        console.log('Successful appointment posting', res);
      })
      .catch(err => {
        console.log('Failed appointment posting', err);
      });
  };

  const rescheduleCust = (authState, values) => {
    const headers = getAuthHeader(authState);

    return axios
      .put(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/customerSchedule/confirm`,
        values,
        { headers }
      )
      .then(res => {
        console.log('Updated', res);
      })
      .catch(err => {
        console.log('Failed appointment posting', err);
      });
  };

  const getCustomerAppointments = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/customerSchedule`,
        {}
      )
      .then(res => {
        if (res.data) {
          setCustomerAppointments(res.data);
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCustAppointmentByTrans = crosshair => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/customerSchedule/locate/${crosshair}`
      )
      .then(res => {
        setTarget(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editCustomerAppointmentConfirmation = (authState, confirmation) => {
    const headers = getAuthHeader(authState);
    return axios
      .put(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/customerSchedule/confirm`,
        confirmation,
        { headers }
      )
      .then(res => {
        console.log('Successful appointment confirmation', res);
      })
      .catch(err => {
        console.log('Failed appointment confirmation', err);
      });
  };

  const getGroomerAppointments = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URI}/groomers/${userInfo.sub}/groomerSchedule`,
        {}
      )
      .then(res => {
        if (res.data) {
          setGroomerAppointments(res.data);
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  const editGroomerAppointmentConfirmation = (authState, confirmation) => {
    const headers = getAuthHeader(authState);
    return axios
      .put(
        `${process.env.REACT_APP_API_URI}/groomers/${userInfo.sub}/groomerSchedule/confirm`,
        confirmation,
        { headers }
      )
      .then(res => {
        console.log('Successful appointment confirmation', res);
      })
      .catch(err => {
        console.log('Failed appointment confirmation', err);
      });
  };

  //Favoriting Groomers
  const postFavorite = pathway => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/favorites/${pathway}`,
        { pathway }
      )
      .then(res => {
        console.log('Successful favorite posting', res);
      })
      .catch(err => {
        console.log('Failed favorite posting', err);
      });
  };
  const getCustomerFavorites = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}/favorites`,
        {}
      )
      .then(res => {
        if (res.data) {
          console.log(res.data.data);
          setCustomerFavorites(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  /******************************************************************************
   *                      API calls for pets
   ******************************************************************************/

  const addNewPet = (authState, petInfo) => {
    const headers = getAuthHeader(authState);

    return axios
      .post(`${process.env.REACT_APP_API_URI}/pets/${userInfo.sub}`, petInfo, {
        headers,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        setIsError(true);
      });
  };

  return (
    <APIContext.Provider
      value={{
        sleep,
        getGroomerServicesByID,
        getGroomers,
        getGroomerByID,
        getLoggedInGroomer,
        getExampleData,
        getProfileData,
        getUserID,
        getCustomerByID,
        postUserInfo,
        putUserInfo,
        postGroomerServices,
        editGroomerServices,
        deleteService,
        deleteProfile,
        addNewPet,
        getServices,
        getLatLng,
        getGroomerRatesByID,
        getGroomerRatingAverageByID,
        getGroomerRatingCountByID,
        postAppointment,
        postRating,
        getCustomerAppointments,
        getCustAppointmentByTrans,
        getGroomerAppointments,
        getCustomerFavorites,
        postFavorite,
        editGroomerAppointmentConfirmation,
        rescheduleCust,
        editCustomerAppointmentConfirmation,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
