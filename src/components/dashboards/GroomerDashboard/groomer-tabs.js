import React, { useContext, useState, useEffect } from 'react';
import { Alert, Col, Form, Row, Tabs } from 'antd';
import Overview from './overview';
import GroomerProfilePage from '../../profiles/GroomerProfile/GroomerProfilePage';
import RenderFormGR from '../../forms/GroomerProfileForm/RenderFormGR';
import './groomer-dash.scss';
// context imports
import { FormContext } from '../../../state/contexts/FormContext';
import FileUpload from '../../common/FileUpload';
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import { useOktaAuth } from '@okta/okta-react';

const { TabPane } = Tabs;

const GroomerTab = () => {
  const { authState } = useOktaAuth();
  const { resultInfo } = useContext(FormContext);
  const { groomerInfo, groomerAppointments } = useContext(GroomersContext);
  const { getGroomerByID, getGroomerAppointments } = useContext(APIContext);

  const [mode] = useState('left');

  useEffect(() => {
    getGroomerByID(authState);
    getGroomerAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    console.log('Groomer appointments state', groomerAppointments),
    (
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
                <i className="fas fa-paw"></i> My Info
              </span>
            }
            key="1"
          >
            <Row justify={'center'}>
              <Col>
                <RenderFormGR />
              </Col>
            </Row>
            <Row justify={'center'}>
              <h2 style={{ marginTop: '10px' }}>Upload License</h2>
            </Row>
            <Row justify={'center'}>
              <FileUpload
                uploadUrl={`groomers/license-upload/${groomerInfo.user_id}`}
              />
            </Row>

            <Row justify={'center'} className={'alert-row'}>
              {resultInfo.message !== null ? (
                <Form.Item>
                  <Alert
                    message={resultInfo.message}
                    type={resultInfo.type}
                    showIcon
                    className={'alert'}
                  />
                </Form.Item>
              ) : null}
            </Row>
            <GroomerProfilePage />
          </TabPane>

          <TabPane
            tab={
              <span>
                <i className="fas fa-paw"></i> Payments
              </span>
            }
            key="2"
          ></TabPane>
          <TabPane
            tab={
              <span>
                <i className="fas fa-paw"></i> Appointments
              </span>
            }
            key="3"
          >
            <h3>Upcoming Appointments:</h3>
            <br />
            {groomerAppointments !== undefined ? (
              groomerAppointments.map(info => {
                return (
                  <div key={Date.now()}>
                    <h4>
                      {info.given_name} {info.family_name}
                    </h4>
                    <p>Date: {info.date}</p>
                    <p>Time: {info.startTime}</p>
                    <p>
                      Services:{' '}
                      {info.transaction.map(data => {
                        return data;
                      })}
                    </p>
                    <button>Reschedule</button>
                    <button>Accept</button>
                    <button>Decline</button>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                );
              })
            ) : (
              <p>No Appointments</p>
            )}
          </TabPane>
        </Tabs>
      </div>
    )
  );
};

export default GroomerTab;
