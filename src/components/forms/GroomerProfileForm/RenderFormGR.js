import React, { useContext, useEffect, useState } from 'react';
import HoursSelector from './HoursSelector';
import { useOktaAuth } from '@okta/okta-react';
import { Alert, Button, Form, Input, Modal, Row, Select, Spin } from 'antd';
import 'antd/dist/antd.css';
import './form.scss';
// context imports
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { UsersContext } from '../../../state/contexts/UsersContext';
import { FormContext } from '../../../state/contexts/FormContext';
import { APIContext } from '../../../state/contexts/APIContext';

const RenderFormGR = () => {
  const { authState } = useOktaAuth();
  //sets up initial values from customers table when rendered
  const [form] = Form.useForm();
  const { Option } = Select;

  // context state
  const { userInfo, isRegistered } = useContext(UsersContext);
  const {
    updateOpenHours,
    updateCloseHours,
    hoursOfOpp,
    serviceToAdd,
    priceToAdd,
    services,
    groomerServices,
    deleteGroomerProfile,
    groomerInfo,
    hours,
    setUpdated,
    updated,
    changePrice,
    changeService,
    servicesUpdated,
    setServicesUpdated,
  } = useContext(GroomersContext);
  const {
    onFailed,
    showDelete,
    setShowDelete,
    groomerFormVisible,
    setGroomerFormVisible,
    loading,
    setLoading,
    setResultInfo,
  } = useContext(FormContext);
  const {
    postUserInfo,
    putUserInfo,
    getLoggedInGroomer,
    getServices,
    getGroomerServicesByID,
    postGroomerServices,
    getLatLng,
  } = useContext(APIContext);

  // modal state specific to this components modals
  const [editHoursVisible, setEditHoursVisible] = useState(false);
  const [editServicesVisible, setEditServicesVisible] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [groomerInfo, form, updated, groomerServices, servicesUpdated]);

  useEffect(() => {
    getServices();
    getGroomerServicesByID(userInfo.sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesUpdated]);

  const onGroomerInfoSubmit = async values => {
    // TODO calculate lat & lng  from address and zip to add to the groomer info
    const address = `${values.address}+${values.zip_code}`;
    const latLng = await getLatLng(address);

    setLoading(true);
    const hoursString = JSON.stringify(hours);
    //add in user id and hours
    const infoValues = {
      user_id: userInfo.sub,
      hours: hoursString,
      lat: latLng[0],
      lng: latLng[1],
      ...values,
    };
    //checking isRegistered and calling the API to either create or update
    //API calls are abstracted out into the API/index file as functions and called here
    if (isRegistered === false) {
      postUserInfo(
        `${process.env.REACT_APP_API_URI}/groomers/`,
        authState,
        infoValues
      );
      await getLoggedInGroomer(authState);
    } else {
      putUserInfo(
        `${process.env.REACT_APP_API_URI}/groomers/${userInfo.sub}`,
        authState,
        infoValues
      );
      await getLoggedInGroomer(authState);
      await setUpdated(!updated);
      await setServicesUpdated(!servicesUpdated);
      await setTimeout(() => {
        setGroomerFormVisible(false);
        setEditHoursVisible(false);
        setEditServicesVisible(false);
      }, 2000);
    }
  };

  // function to add a new service
  const addService = async () => {
    setLoading(true);
    const serviceValues = {
      groomer_id: userInfo.sub,
      services_id: serviceToAdd,
      services_price: priceToAdd,
    };
    await postGroomerServices(
      `${process.env.REACT_APP_API_URI}/groomer_services/`,
      authState,
      serviceValues,
      setResultInfo
    );
    await getLoggedInGroomer(authState);
    await setUpdated(!updated);
    await setServicesUpdated(!servicesUpdated);
    await setTimeout(() => {
      setGroomerFormVisible(false);
      setEditHoursVisible(false);
      setEditServicesVisible(false);
    }, 2000);
  };

  // modal specific functions
  const showGroomerProfileModal = async () => {
    getLoggedInGroomer(authState);
    setLoading(false);
    setGroomerFormVisible(true);
  };

  const showGroomerHoursModal = () => {
    setLoading(false);
    setEditHoursVisible(true);
  };

  const showGroomerServicesModal = () => {
    setLoading(false);
    setEditServicesVisible(true);
  };

  const handleCancel = () => {
    setGroomerFormVisible(false);
    setEditHoursVisible(false);
    setEditServicesVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showGroomerProfileModal}
        className={'form-button'}
      >
        Update Profile
      </Button>
      <Modal
        okButtonProps={{
          form: 'groomer-profile-form',
          key: 'submit',
          htmlType: 'submit',
        }}
        title="Groomer Information"
        visible={groomerFormVisible}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        {loading === false ? (
          // The form
          <>
            <Form
              id={'groomer-profile-form'}
              labelCol={{ offset: 4, span: 15 }}
              wrapperCol={{ offset: 4, span: 15 }}
              form={form}
              layout="vertical"
              name="PoProfile"
              initialValues={groomerInfo}
              onFinish={onGroomerInfoSubmit}
              onFinishFailed={onFailed}
              size="small"
            >
              <Form.Item
                label="First Name"
                name="given_name"
                rules={[{ required: true }]}
                initialValue={groomerInfo.given_name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="family_name"
                rules={[{ required: true }]}
                initialValue={groomerInfo.family_name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Business Name"
                name="business_name"
                rules={[{ required: true }]}
                initialValue={groomerInfo.business_name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[{ required: true }]}
                initialValue={groomerInfo.phone_number}
                type="hidden"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
                initialValue={groomerInfo.address}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true }]}
                initialValue={groomerInfo.city}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true }]}
                initialValue={groomerInfo.state}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Zip Code"
                name="zip_code"
                rules={[{ required: true }]}
                initialValue={groomerInfo.zip_code}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true }]}
                initialValue={groomerInfo.country}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Personal Calendly Scheduling Link"
                name="personal_calendly_link"
                rules={[{ required: true }]}
                initialValue={groomerInfo.personal_calendly_link}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="About"
                name="about"
                initialValue={groomerInfo.about}
              >
                <Input.TextArea rows={6} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 4, span: 8 }}></Form.Item>

              {/* Delete profile modal */}
              <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
                {isRegistered ? (
                  <Button
                    type="primary"
                    onClick={() => setShowDelete(true)}
                    danger
                  >
                    Delete Profile
                  </Button>
                ) : null}
              </Form.Item>

              <Modal
                title="Are you sure you want to delete your profile?"
                visible={showDelete}
                onOk={() => {
                  deleteGroomerProfile();
                  setShowDelete(false);
                }}
                onCancel={() => setShowDelete(false)}
              >
                <Alert
                  message="By selecting Ok your profile will be deleted"
                  type="warning"
                  showIcon
                />
              </Modal>
            </Form>
          </>
        ) : (
          // Loading view for use when submitted
          <>
            <Row justify={'center'} align={'center'}>
              <Spin tip="Loading..." size={'large'} />
            </Row>
          </>
        )}
      </Modal>
      <Button
        type="primary"
        onClick={showGroomerHoursModal}
        className={'form-button'}
      >
        Update Hours
      </Button>
      <Modal
        okButtonProps={{
          form: 'groomer-hours-form',
          key: 'submit',
          htmlType: 'submit',
        }}
        title="Groomer Hours Information"
        visible={editHoursVisible}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        {loading === false ? (
          // The form
          <>
            <Form
              id={'groomer-hours-form'}
              labelCol={{ offset: 4, span: 15 }}
              wrapperCol={{ offset: 4, span: 15 }}
              form={form}
              // layout="vertical"
              name="PoProfile"
              initialValues={groomerInfo}
              onFinish={onGroomerInfoSubmit}
              onFinishFailed={onFailed}
              size="small"
            >
              <HoursSelector
                hoursOfOpp={hoursOfOpp}
                updateOpenHours={updateOpenHours}
                updateCloseHours={updateCloseHours}
              />
            </Form>
          </>
        ) : (
          // Loading view for use when submitted
          <>
            <Row justify={'center'} align={'center'}>
              <Spin tip="Loading..." size={'large'} />
            </Row>
          </>
        )}
      </Modal>
      <Button
        type="primary"
        onClick={showGroomerServicesModal}
        className={'form-button'}
      >
        Add Services
      </Button>
      <Modal
        okButtonProps={{
          form: 'groomer-services-form',
          key: 'submit',
          htmlType: 'submit',
        }}
        title="Groomer Services Information"
        visible={editServicesVisible}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        {loading === false ? (
          // The form
          <>
            <div className="services-container">
              <Form
                id={'groomer-services-form'}
                labelCol={{ offset: 4, span: 15 }}
                wrapperCol={{ offset: 4, span: 15 }}
                form={form}
                // layout="vertical"
                name="PoProfile"
                initialValues={groomerInfo}
                onFinish={addService}
                onFinishFailed={onFailed}
                size="small"
              >
                <p>Add a service</p>
                <div>
                  {/* TODO refactor this to allow adding new services ? */}
                  <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                    <Select onChange={changeService} placeholder="Services">
                      {services.length > 0
                        ? services.map((service, index) => (
                            <Option key={index} value={service.id}>
                              {service.service_name}
                            </Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 2, span: 5 }}>
                    <Input
                      type="number"
                      placeholder="Price"
                      onChange={value => changePrice(value)}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </>
        ) : (
          // Loading view for use when submitted
          <>
            <Row justify={'center'} align={'center'}>
              <Spin tip="Loading..." size={'large'} />
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default RenderFormGR;
