import React, { useEffect, useContext } from 'react';
import { Layout, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../profiles/GroomerProfile/groomer.css';
import PublicServices from './GroomerPublicServices';
import '../../search/SearchResults/GroomerPublicProfile.scss';
import { Rate } from 'antd';
// context imports
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import CalendlyPopupWidget from '../../common/CalendlyPopupWidget';
import ApptModal from '../../common/ApptModal';

const GroomerPublicProfile = props => {
  const pathway = props.match.params.id;
  // context state
  const { groomer } = useContext(GroomersContext);
  const { getGroomerByID } = useContext(APIContext);

  useEffect(() => {
    getGroomerByID(pathway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathway]);

  if (groomer) {
    var groomerHours = JSON.parse(groomer.hours);

    if (groomerHours === null) {
      groomerHours = {
        sunday: { open: 'CLOSED', close: '' },
        monday: { open: 'CLOSED', close: '' },
        tuesday: { open: 'CLOSED', close: '' },
        wednesday: { open: 'CLOSED', close: '' },
        thursday: { open: 'CLOSED', close: '' },
        friday: { open: 'CLOSED', close: '' },
        saturday: { open: 'CLOSED', close: '' },
      };
    }

    return (
      <div className="groomer-public-box">
        <Layout.Content
          style={{
            background: 'white',
            width: '75%',
            margin: '20px auto',
            padding: '2%',
          }}
        >
          <div className="customer-header">
            <p className="heading">{groomer.business_name}</p>
            <ApptModal />
            <div className="rating">
              <Rate />
            </div>
            <div className="avatar">
              <Avatar size={74} icon={<UserOutlined />} />
              <p>
                {' '}
                {groomer.given_name} {groomer.family_name}{' '}
              </p>
            </div>
          </div>
          <div className="customer-info-box">
            <div className="top-info-box">
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>About</Divider>
                <div className="panel-info">
                  <p>{groomer.about}</p>
                </div>
              </div>
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>Services</Divider>
                <div className="panel-info">
                  <PublicServices />
                </div>
              </div>
            </div>
            <div className="bottom-info-box">
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>Location</Divider>
                <div className="panel-info">
                  <p>Address: {groomer.address}</p>
                  <p>City: {groomer.city}</p>
                  <p>State: {groomer.state}</p>
                  <p>Zip Code: {groomer.zip_code}</p>
                  <p>Country: {groomer.country}</p>
                </div>
              </div>
              <div className="panel">
                <Divider style={{ borderColor: 'lightblue' }}>Hours</Divider>
                <div className="panel-info">
                  <p>
                    Sunday: {groomerHours.sunday.open}{' '}
                    {groomerHours.sunday.close}
                  </p>
                  <p>
                    Monday: {groomerHours.monday.open}{' '}
                    {groomerHours.monday.close}
                  </p>
                  <p>
                    Tuesday: {groomerHours.tuesday.open}{' '}
                    {groomerHours.tuesday.close}
                  </p>
                  <p>
                    Wednesday: {groomerHours.wednesday.open}{' '}
                    {groomerHours.wednesday.close}
                  </p>
                  <p>
                    Thurday: {groomerHours.thursday.open}{' '}
                    {groomerHours.thursday.close}
                  </p>
                  <p>
                    Friday: {groomerHours.friday.open}{' '}
                    {groomerHours.friday.close}
                  </p>
                  <p>
                    Saturday: {groomerHours.saturday.open}{' '}
                    {groomerHours.saturday.close}
                  </p>
                </div>
              </div>
              <CalendlyPopupWidget
                scheduleLink={groomer.personal_calendly_link}
              />
            </div>
          </div>
        </Layout.Content>
      </div>
    );
  } else if (!groomer) {
    return (
      <div>
        <p>Loading component..</p>
      </div>
    );
  }
};

export default GroomerPublicProfile;
