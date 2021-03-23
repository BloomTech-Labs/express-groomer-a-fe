import React, { useContext, useEffect } from 'react';
import { ProfileFormGR } from '../../forms/GroomerProfileForm';
import { Avatar, Divider, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './groomer.css';
import Services from './ServicesArea';
// context imports
import { APIContext } from '../../../state/contexts/APIContext';
import { UsersContext } from '../../../state/contexts/UsersContext';
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { FormContext } from '../../../state/contexts/FormContext';
import { useOktaAuth } from '@okta/okta-react';

const GroomerProfilePage = () => {
  const { authState } = useOktaAuth();

  // context state
  const { userInfo } = useContext(UsersContext);
  const { groomerInfo, setHours, hours } = useContext(GroomersContext);
  const { showForm } = useContext(FormContext);
  const { getLoggedInGroomer } = useContext(APIContext);

  useEffect(() => {
    getLoggedInGroomer(authState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (groomerInfo.hours) {
      setHours(JSON.parse(groomerInfo.hours));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groomerInfo]);

  useEffect(() => {
    if (groomerInfo.hours) {
      setHours(JSON.parse(groomerInfo.hours));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groomerInfo]);

  return (
    <div style={{ marginTop: '-12.5%' }}>
      {showForm ? <ProfileFormGR /> : null}
      <Layout.Content
        style={{
          background: 'white',
          width: '100%',
          margin: '20px auto',
          padding: '10px',
        }}
      >
        <div style={{ marginBottom: '4%' }} className="avatar">
          <Avatar size={74} icon={<UserOutlined />} />
        </div>

        <div className="customer-header">
          <p className="heading">
            {' '}
            {groomerInfo.business_name
              ? groomerInfo.business_name
              : userInfo.business_name}{' '}
          </p>
        </div>
        <div className="customer-info-box">
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>
              Personal Info
            </Divider>
            <div className="panel-info">
              <p>
                First Name:{' '}
                {groomerInfo.given_name
                  ? groomerInfo.given_name
                  : userInfo.given_name}
              </p>
              <p>
                Last Name:{' '}
                {groomerInfo.family_name
                  ? groomerInfo.family_name
                  : userInfo.family_name}
              </p>
              <p>Email: {userInfo.email}</p>
              <p>
                Phone Number:{' '}
                {groomerInfo.phone_number
                  ? groomerInfo.phone_number
                  : 'Update your profile'}
              </p>
            </div>
          </div>
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>Address</Divider>
            <div className="panel-info">
              <p>
                Address:{' '}
                {groomerInfo.address
                  ? groomerInfo.address
                  : 'Update your profile'}
              </p>
              <p>
                City:{' '}
                {groomerInfo.city ? groomerInfo.city : 'Update your profile'}
              </p>
              <p>
                State:{' '}
                {groomerInfo.state ? groomerInfo.state : 'Update your profile'}
              </p>
              <p>
                Zip Code:{' '}
                {groomerInfo.zip_code
                  ? groomerInfo.zip_code
                  : 'Update your profile'}
              </p>
              <p>
                Country:{' '}
                {groomerInfo.country
                  ? groomerInfo.country
                  : 'Update your profile'}
              </p>
            </div>
          </div>
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>
              Hours of Operation
            </Divider>
            <div className="panel-info">
              <p>
                Monday:{' '}
                {hours.monday.open
                  ? `${hours.monday.open} - ${hours.monday.close}`
                  : hours.monday}
              </p>
              <p>
                Tuesday:{' '}
                {hours.tuesday.open
                  ? `${hours.tuesday.open} - ${hours.tuesday.close}`
                  : hours.tuesday}
              </p>
              <p>
                Wednesday:{' '}
                {hours.wednesday.open
                  ? `${hours.wednesday.open} - ${hours.wednesday.close}`
                  : hours.wednesday}
              </p>
              <p>
                Thursday:{' '}
                {hours.thursday.open
                  ? `${hours.thursday.open} - ${hours.thursday.close}`
                  : hours.thursday}
              </p>
              <p>
                Friday:{' '}
                {hours.friday.open
                  ? `${hours.friday.open} - ${hours.friday.close}`
                  : hours.friday}
              </p>
              <p>
                Saturday:{' '}
                {hours.saturday.open
                  ? `${hours.saturday.open} - ${hours.saturday.close}`
                  : hours.saturday}
              </p>
              <p>
                Sunday:{' '}
                {hours.sunday.open
                  ? `${hours.sunday.open} - ${hours.sunday.close}`
                  : hours.sunday}
              </p>
            </div>
          </div>
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>Services</Divider>
            <div className="panel-info">
              <Services />
            </div>
          </div>
        </div>
      </Layout.Content>
    </div>
  );
};

export default GroomerProfilePage;
