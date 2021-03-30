import React, { useContext, useState, useEffect } from 'react';
import { Alert, Col, Form, Row, Tabs, Card, Button } from 'antd';
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
  const {
    getGroomerByID,
    getGroomerAppointments,
    editGroomerAppointmentConfirmation,
  } = useContext(APIContext);

  const [mode] = useState('left');

  const [click, setClick] = useState(0);

  var month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    getGroomerByID(authState);
    getGroomerAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        tabPosition={mode}
        style={{ height: '100%', marginLeft: '5%' }}
      >
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> My Info
            </span>
          }
          key="1"
        >
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
          <Row justify={'center'}>
            <Col style={{ marginTop: '-5%' }}>
              <RenderFormGR />
            </Col>
          </Row>
          <div style={{ marginTop: '12%' }}>
            <GroomerProfilePage />
          </div>
          <div style={{ margin: '6%' }}>
            <Row>
              <h2 style={{ marginTop: '10px' }}>Upload License</h2>
            </Row>
            <Row>
              <FileUpload
                uploadUrl={`groomers/license-upload/${groomerInfo.user_id}`}
              />
            </Row>
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> Payments
            </span>
          }
          key="2"
        >
          <div>
            <img
              alt="Dropping Soon"
              src="https://media4.giphy.com/media/oFDSjMfe11iiOgQRfY/giphy.gif?cid=ecf05e47n0390t5bo51sb87wl985q777gm0j18szjottt74i&rid=giphy.gif"
            />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> Appointments
            </span>
          }
          key="3"
        >
          <h2 style={{ margin: '2%' }}>Upcoming Appointments:</h2>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            {groomerAppointments !== undefined ? (
              groomerAppointments.map(info => {
                let accepted = {
                  confirmation: 'accepted',
                  transaction_id: info.transaction,
                };
                let declined = {
                  confirmation: 'declined',
                  transaction_id: info.transaction,
                };

                return (
                  <div key={info.transaction} style={{ margin: '2%' }}>
                    <Card
                      hoverable
                      title={`${info.given_name} ${info.family_name}`}
                      extra={`${info.confirmation}`}
                      style={{ width: 300, border: 'solid 0.8px black' }}
                    >
                      <h3 style={{ marginTop: '2%' }}>Date:</h3>
                      <h4 style={{ marginBottom: '-1%', fontStyle: 'italic' }}>
                        Day
                      </h4>
                      <p>
                        {info.date.slice(8, 10)}{' '}
                        {month[info.date.slice(5, 7) - 1]},{' '}
                        {info.date.slice(0, 4)}
                      </p>
                      <h4
                        style={{
                          marginTop: '2%',
                          marginBottom: '-1%',
                          fontStyle: 'italic',
                        }}
                      >
                        Time
                      </h4>
                      <p>
                        {info.startTime.slice(0, 2) === 12
                          ? info.startTime.slice(0, 5) + 'PM'
                          : info.startTime.slice(0, 2) < 12
                          ? info.startTime.slice(0, 5) + 'AM'
                          : info.startTime.slice(0, 2) > 12
                          ? info.startTime.slice(0, 2) -
                            12 +
                            ':' +
                            info.startTime.slice(3, 5) +
                            'PM'
                          : info.startTime.slice(0, 5) + 'PM'}{' '}
                      </p>
                      {info.confirmation !== 'canceled' ? (
                        <div>
                          <h3 style={{ marginTop: '2%' }}>Services:</h3>
                          <p>
                            {info.cart.map(data => {
                              return data;
                            })}
                          </p>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <h3 style={{ marginTop: '2%' }}>Address:</h3>
                      <p>{info.address}</p>
                      <p
                        style={{ marginTop: '-6%' }}
                      >{`${info.city}, ${info.state} ${info.zip_code}`}</p>
                      <h3 style={{ marginTop: '2%' }}>Contact:</h3>
                      <h4
                        style={{
                          marginTop: '2%',
                          marginBottom: '-2%',
                          fontStyle: 'italic',
                        }}
                      >
                        Phone Number
                      </h4>
                      <a
                        href={`tel:${info.phone_number}`}
                        style={{ marginTop: '0%' }}
                      >
                        {info.phone_number}
                      </a>
                      <br />
                      <div style={{ paddingTop: '8%' }}>
                        {info.confirmation !== 'canceled' ? (
                          <div>
                            <Button>Reschedule</Button>
                            <br />
                            <br />
                            <Button
                              type="primary"
                              onClick={() => {
                                editGroomerAppointmentConfirmation(
                                  authState,
                                  accepted
                                );
                                setClick(click + 1);
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              type="primary"
                              danger
                              onClick={() => {
                                editGroomerAppointmentConfirmation(
                                  authState,
                                  declined
                                );
                                setClick(click + 1);
                              }}
                            >
                              Decline
                            </Button>{' '}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div>
                <p>No Appointments</p>
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default GroomerTab;
