import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Row,
  Tabs,
  Card,
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  Select,
  DatePicker,
  notification,
} from 'antd';

import moment from 'moment';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import CustomerProfilePage from '../../profiles/CustomerProfile/CustProContainer';
import { ProfileFormPO } from '../../forms/CustomerProfileForm';
import AddPetForm from '../../forms/PetForm/AddPetForm';

// context imports
import { FormContext } from '../../../state/contexts/FormContext';
import FileUpload from '../../common/FileUpload';
import { CustomersContext } from '../../../state/contexts/CustomersContext';
import { APIContext } from '../../../state/contexts/APIContext';
import { useOktaAuth } from '@okta/okta-react';
import { GroomersContext } from '../../../state/contexts/GroomersContext';

const { TabPane } = Tabs;
const { Option } = Select;
const pet = {};

const CustTab = () => {
  const { authState } = useOktaAuth();
  const [mode] = useState('left');
  // context state
  const { resultInfo, target } = useContext(FormContext);
  const { custInfo, customerAppointments, customerFavorites } = useContext(
    CustomersContext
  );
  const {
    getCustomerByID,
    getCustomerAppointments,
    rescheduleCust,
    getCustomerFavorites,
    getGroomerServicesByID,
    getCustAppointmentByTrans,
    editCustomerAppointmentConfirmation,
  } = useContext(APIContext);
  const { groomerServices } = useContext(GroomersContext);
  const [click, setClick] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const disablePastDates = current =>
    current && current < moment().endOf('day');

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select date and time',
      },
    ],
  };

  const submitNotification = () => {
    notification.open({
      message: "We've updated your appointment!",
      description:
        'Appointment status has been set to "pending", the groomer will review these changes',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const cancelNotification = () => {
    notification.open({
      message: 'Appointment canceled!',
      description:
        'Appointment status has been set to "canceled", fell free to change this',
      icon: <FrownOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const onFinish = fieldsValue => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      date: fieldsValue['date-picker'].format('YYYY-MM-DD'),
      startTime: fieldsValue['time-picker'].format('HH:mm:ss'),
      endTime: '23:59',
      services: fieldsValue['service'],
      transaction_id: target[0].transaction,
      //       'cust-name': userInfo.name,
      //       'cust-email': userInfo.email,
      //       phone: fieldsValue['phone'],
    };
    rescheduleCust(authState, values);
    setIsModalVisible(false);
    submitNotification();
    setTimeout(function() {
      setClick(click => click + 1);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTimeout(function() {
      setClick(click => click + 1);
    }, 1000);
  };

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
    getCustomerByID(authState);
    getCustomerAppointments();
    getCustomerFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        tabPosition={mode}
        style={{ height: '100%', marginLeft: '5%' }}
      >
        {/* <TabPane
            style={{ fontSize: '16px' }}
            tab={
              <span>
                <i className="fas fa-paw"></i> Overview
              </span>
            }
            key="0"
          >
            <Overview />
          </TabPane> */}
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i>
              {` `}
              {` My Info`}
            </span>
          }
          key="1"
        >
          <Row justify={'center'} style={{ marginLeft: '-10%' }}>
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
          <div style={{ marginTop: '-8%', marginLeft: '-10%' }}>
            <CustomerProfilePage />
          </div>
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
          <div style={{ width: '100%', display: 'flex', textAlign: 'center' }}>
            <h2 style={{ width: '100%' }}>Upcoming Appointments</h2>
          </div>

          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            {customerAppointments !== undefined ? (
              customerAppointments.map(info => {
                let canceled = {
                  services: [info.services],
                  confirmation: 'canceled',
                  transaction_id: info.transaction,
                };
                return (
                  <div key={info.transaction} style={{ margin: '2%' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'black',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          height: '2.75rem',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: '.5rem',
                        }}
                      >
                        <p
                          style={{
                            color: 'white',
                            height: '1.70rem',
                            fontSize: '1.5rem',
                          }}
                          className="card-title"
                        >{`${info.business_name}`}</p>
                        <p
                          style={{ color: 'white' }}
                        >{`${info.confirmation}`}</p>
                      </div>
                      <Card
                        hoverable
                        style={{ width: 375, border: 'solid 0.8px black' }}
                      >
                        <h3>Certified Groomer:</h3>
                        <p>{`${info.given_name} ${info.family_name.slice(
                          0,
                          1
                        )}.`}</p>
                        <h3 style={{ marginTop: '2%' }}>Address:</h3>
                        <p>{info.address}</p>
                        <p
                          style={{ marginTop: '-6%' }}
                        >{`${info.city}, ${info.state} ${info.zip_code}`}</p>
                        <h3 style={{ marginTop: '2%' }}>Date:</h3>
                        <h4
                          style={{ marginBottom: '-1%', fontStyle: 'italic' }}
                        >
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
                        {/* <p>{info.startTime.slice(0, 5)}</p> */}
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
                            <div>
                              {info.cart.map(data => {
                                return (
                                  <div
                                    key={data.id}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    {data}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <h3 style={{ marginTop: '2%' }}>Contact:</h3>
                        <h4
                          style={{ marginBottom: '-2%', fontStyle: 'italic' }}
                        >
                          Email
                        </h4>
                        <a href={`mailto:${info.email}`}> {info.email}</a>
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
                        <p></p>
                        <Button
                          style={{ margin: '.5rem' }}
                          onClick={() => {
                            let id = info.groom_id;
                            let crosshair = info.transaction;
                            getCustAppointmentByTrans(crosshair);
                            setIsModalVisible(true);
                            getGroomerServicesByID(id);
                          }}
                        >
                          {' '}
                          Change{' '}
                        </Button>
                        {info.confirmation !== 'canceled' ? (
                          <Button
                            style={{ margin: '.5rem' }}
                            type="danger"
                            onClick={() => {
                              handleCancel();
                              editCustomerAppointmentConfirmation(
                                authState,
                                canceled
                              );
                              cancelNotification();
                            }}
                          >
                            Cancel Appointment
                          </Button>
                        ) : (
                          <div></div>
                        )}
                        {target !== undefined ? (
                          <Modal
                            key={target[0].transaction}
                            closable={false}
                            footer={null}
                            title="Make changes to the selected appointment"
                            visible={isModalVisible}
                          >
                            <Form
                              name="time_related_controls"
                              onFinish={onFinish}
                            >
                              <Form.Item
                                name="date-picker"
                                label="Date"
                                {...config}
                              >
                                <DatePicker
                                  disabledDate={current =>
                                    disablePastDates(current)
                                  }
                                />
                              </Form.Item>

                              <Form.Item
                                name="time-picker"
                                label="Time"
                                {...config}
                              >
                                <TimePicker use12Hours format="h:mm a" />
                              </Form.Item>

                              <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input your phone number',
                                  },
                                ]}
                              >
                                <Input
                                  style={{
                                    width: '100%',
                                  }}
                                />
                              </Form.Item>

                              <Form.Item
                                name="service"
                                label="Service"
                                hasFeedback
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select service',
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Please select services"
                                  mode="multiple"
                                >
                                  {groomerServices.map(service => {
                                    return (
                                      <Option
                                        key={service.id}
                                        value={service.id}
                                      >
                                        {service.service_name}, $
                                        {service.services_price}
                                      </Option>
                                    );
                                  })}
                                </Select>
                              </Form.Item>

                              <Form.Item
                                wrapperCol={{
                                  xs: {
                                    span: 24,
                                    offset: 0,
                                  },
                                  sm: {
                                    span: 16,
                                    offset: 8,
                                  },
                                }}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                  width: '100%',
                                }}
                              >
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{ alignSelf: 'center' }}
                                >
                                  Submit
                                </Button>
                              </div>
                            </Form>
                          </Modal>
                        ) : (
                          ''
                        )}
                      </Card>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Appointments</p>
            )}
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="fas fa-paw"></i> Favorite Groomers
            </span>
          }
          key="4"
        >
          <div className="Favorite-Groomers">
            <h1>Favorite Groomers</h1>
            {customerFavorites !== undefined ? (
              customerFavorites.map(info => {
                return (
                  <div key={info.transaction()} style={{ margin: '2%' }}>
                    <Card
                      hoverable
                      title={`${info.business_name}`}
                      style={{ width: 375, border: 'solid 0.8px black' }}
                    ></Card>
                    <button>Remove</button>
                  </div>
                );
              })
            ) : (
              <p>No Favorites</p>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustTab;
