import React from 'react';
import RenderFormPO from './RenderFormPO';

//This form needs some info passed down as props
//info from customers if available
//an isRefistered bool to determine if a user has already registered as a customer
//userInfo.sub from okta (the users id)
const FormPOContainer = () => {
  return <RenderFormPO />;
};

export default FormPOContainer;
