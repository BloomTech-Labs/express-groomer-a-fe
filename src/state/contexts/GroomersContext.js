import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
// context imports
import { UsersContext } from './UsersContext';
import { APIContext } from './APIContext';
import { FormContext } from './FormContext';

export const GroomersContext = createContext({});

const GroomersProvider = ({ children }) => {
  const [groomer, setGroomer] = useState();
  const [groomerInfo, setGroomerInfo] = useState({});
  const [allGroomers, setAllGroomers] = useState();
  const [filteredGroomers, setFilteredGroomers] = useState([]);
  const [groomerServices, setGroomerServices] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [servicesUpdated, setServicesUpdated] = useState(false);
  const [rating, setRating] = useState();
  const [ratingAverage, setRatingAverage] = useState({ avg: '0' });
  const [ratingCount, setRatingCount] = useState({});
  const [groomerAppointments, setGroomerAppointments] = useState();

  // context state
  const { userInfo } = useContext(UsersContext);
  const { deleteProfile } = useContext(APIContext);
  const { setResultInfo } = useContext(FormContext);

  const history = useHistory();

  const hoursTemp = {
    sunday: 'closed',
    monday: 'closed',
    tuesday: 'closed',
    wednesday: 'closed',
    thursday: 'closed',
    friday: 'closed',
    saturday: 'closed',
  };
  const [hours, setHours] = useState(hoursTemp);

  //services
  const [services, setServices] = useState({});

  //for adding a service
  const [serviceToAdd, setServiceToAdd] = useState('');
  const [priceToAdd, setPriceToAdd] = useState(0);

  const deleteGroomerProfile = authState => {
    deleteProfile(authState, 'groomers', userInfo, history, setResultInfo);
  };

  //updating open hours by day
  const updateOpenHours = (day, value) => {
    switch (day) {
      case 'sunday':
        setHours({
          ...hours,
          sunday: value ? { open: value } : 'closed',
        });
        break;
      case 'monday':
        setHours({
          ...hours,
          monday: value ? { open: value } : 'closed',
        });
        break;
      case 'tuesday':
        setHours({
          ...hours,
          tuesday: value ? { open: value } : 'closed',
        });
        break;
      case 'wednesday':
        setHours({
          ...hours,
          wednesday: value ? { open: value } : 'closed',
        });
        break;
      case 'thursday':
        setHours({
          ...hours,
          thursday: value ? { open: value } : 'closed',
        });
        break;
      case 'friday':
        setHours({
          ...hours,
          friday: value ? { open: value } : 'closed',
        });
        break;
      case 'saturday':
        setHours({
          ...hours,
          saturday: value ? { open: value } : 'closed',
        });
        break;
      default:
        setHours({ ...hours });
    }
  };

  //updating closed hours by day
  const updateCloseHours = (day, value) => {
    switch (day) {
      case 'sunday':
        setHours({
          ...hours,
          sunday: value ? { ...hours.sunday, close: value } : 'closed',
        });
        break;
      case 'monday':
        setHours({
          ...hours,
          monday: value ? { ...hours.monday, close: value } : 'closed',
        });
        break;
      case 'tuesday':
        setHours({
          ...hours,
          tuesday: value ? { ...hours.tuesday, close: value } : 'closed',
        });
        break;
      case 'wednesday':
        setHours({
          ...hours,
          wednesday: value ? { ...hours.wednesday, close: value } : 'closed',
        });
        break;
      case 'thursday':
        setHours({
          ...hours,
          thursday: value ? { ...hours.thursday, close: value } : 'closed',
        });
        break;
      case 'friday':
        setHours({
          ...hours,
          friday: value ? { ...hours.friday, close: value } : 'closed',
        });
        break;
      case 'saturday':
        setHours({
          ...hours,
          saturday: value ? { ...hours.saturday, close: value } : 'closed',
        });
        break;
      default:
        setHours({ ...hours });
    }
  };

  const changeService = value => {
    setServiceToAdd(value);
  };

  const changePrice = event => {
    setPriceToAdd(event.target.value);
  };

  return (
    <GroomersContext.Provider
      value={{
        groomer,
        setGroomer,
        groomerInfo,
        setGroomerInfo,
        allGroomers,
        setAllGroomers,
        filteredGroomers,
        setFilteredGroomers,
        groomerServices,
        setGroomerServices,
        hours,
        hoursTemp,
        setHours,
        services,
        setServices,
        serviceToAdd,
        setServiceToAdd,
        priceToAdd,
        updated,
        setUpdated,
        servicesUpdated,
        setServicesUpdated,
        changePrice,
        changeService,
        updateCloseHours,
        updateOpenHours,
        deleteGroomerProfile,
        rating,
        setRating,
        ratingAverage,
        setRatingAverage,
        ratingCount,
        setRatingCount,
        groomerAppointments,
        setGroomerAppointments,
      }}
    >
      {children}
    </GroomersContext.Provider>
  );
};

export default GroomersProvider;
