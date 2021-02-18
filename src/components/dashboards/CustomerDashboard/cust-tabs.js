import { Alert, Row, Tabs } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Overview from './overview';
import CustomerProfilePage from '../../profiles/CustomerProfile/CustProContainer';
import { ProfileFormPO } from '../../forms/CustomerProfileForm';
import AddPetForm from '../../forms/PetForm/AddPetForm';
// context imports
import { FormContext } from '../../../state/contexts/FormContext';
import FileUpload from '../../common/FileUpload';
import { CustomersContext } from '../../../state/contexts/CustomersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import { useOktaAuth } from '@okta/okta-react';

const { TabPane } = Tabs;

// this will need to be deleted and pet, setPet will be used instead once
// hooked up
const pet = {};

const CustTab = () => {
  const { authState } = useOktaAuth();
  // const [pet, setPet] = useState();
  const [mode] = useState('left');
  // context state
  const { resultInfo } = useContext(FormContext);
  const { custInfo } = useContext(CustomersContext);
  const { getCustomerByID } = useContext(APIContext);

  useEffect(() => {
    getCustomerByID(authState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        tabPosition={mode}
        style={{ height: '100%', marginLeft: '5%' }}
      >
        <TabPane
          style={{ fontSize: '16px' }}
          tab={
            <span>
              <i className="fas fa-paw"></i> Overview
            </span>
          }
          key="0"
        >
          <Overview />
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i>
              My Info
            </span>
          }
          key="1"
        >
          <Row justify={'center'}>
            <ProfileFormPO />
          </Row>
          <Row justify={'center'} style={{ height: '60px' }}>
            {resultInfo.message !== null ? (
              <Alert
                message={resultInfo.message}
                type={resultInfo.type}
                showIcon
                style={{ marginTop: '20px', height: '40px' }}
              />
            ) : null}
          </Row>
          <CustomerProfilePage />
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> My Pets
            </span>
          }
          key="2"
        >
          {/* Pet form is placed inside a row component for easy center
             alignment*/}
          <Row justify={'center'}>
            <AddPetForm />
          </Row>
          {/* These 2 components will eventually live on pet display
           component*/}
          <Row justify={'center'}>
            <h2 style={{ marginTop: '10px' }}>Upload Pet Image</h2>
          </Row>
          <Row justify={'center'}>
            <FileUpload
              /* logic will need to be added to get a pet from API for this
               to be functional */
              uploadUrl={`pets/image-upload/${pet && pet.id}?customer_id=${
                custInfo.user_id
              }`}
            />
          </Row>
          <Row justify={'center'}>
            <h2 style={{ marginTop: '10px' }}>Upload Pet Vaccination Image</h2>
          </Row>
          <Row justify={'center'}>
            <FileUpload
              /* logic will need to be added to get a pet from API for this
               to be functional */
              uploadUrl={`pets/vaccination-upload/${pet &&
                pet.id}?customer_id=${custInfo.user_id}`}
            />
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> Appointments
            </span>
          }
          key="3"
        >
          Appointments
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> Search Groomers
            </span>
          }
          key="4"
        >
          Search Groomers
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustTab;
