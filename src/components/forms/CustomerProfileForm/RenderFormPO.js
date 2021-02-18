import React, { useEffect, useContext } from 'react';
import { Form, Input, Button, Alert, Modal, Row, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useOktaAuth } from '@okta/okta-react';
// context imports
import { UsersContext } from '../../../state/contexts/UsersContext';
import { FormContext } from '../../../state/contexts/FormContext';
import { CustomersContext } from '../../../state/contexts/CustomersContext';
import { APIContext } from '../../../state/contexts/APIContext';

const RenderFormPO = () => {
  const { authState } = useOktaAuth();

  // context state
  const { userInfo, isRegistered } = useContext(UsersContext);
  const { custInfo, deleteCustomerProfile, updated, setUpdated } = useContext(
    CustomersContext
  );
  const {
    onFailed,
    showDelete,
    setShowDelete,
    custFormVisible,
    setCustFormVisible,
    loading,
    setLoading,
  } = useContext(FormContext);
  const { postUserInfo, putUserInfo, getCustomerByID } = useContext(APIContext);

  //sets up initial values from customers table when rendered
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [custInfo, form]);

  // this function will be used to handle user info form submit
  const onUserInfoSubmit = async values => {
    setLoading(true);
    //add in user id to values from fields
    const infoValues = {
      user_id: userInfo.sub,
      ...values,
    };

    //checking isRegistered and calling the api to either create or update
    if (isRegistered === false) {
      postUserInfo(
        `${process.env.REACT_APP_API_URI}/customers`,
        authState,
        infoValues
      );
    } else {
      putUserInfo(
        `${process.env.REACT_APP_API_URI}/customers/${userInfo.sub}`,
        authState,
        infoValues
      );
    }
    setUpdated(!updated);
    await setTimeout(() => {
      setCustFormVisible(false);
    }, 2000);
  };

  // modal specific functions
  const showModal = () => {
    getCustomerByID(authState);
    setLoading(false);
    setCustFormVisible(true);
  };

  const handleCancel = () => {
    setCustFormVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update Information
      </Button>
      <Modal
        okButtonProps={{
          form: 'customer-form',
          key: 'submit',
          htmlType: 'submit',
        }}
        title="Customer Information"
        visible={custFormVisible}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        {loading === false ? (
          // The form
          <>
            <Form
              id={'customer-form'}
              labelCol={{ offset: 4, span: 15 }}
              wrapperCol={{ offset: 4, span: 15 }}
              form={form}
              layout="vertical"
              name="PoProfile"
              initialValues={custInfo}
              onFinish={onUserInfoSubmit}
              onFinishFailed={onFailed}
              size="small"
            >
              <Form.Item
                label="First Name"
                name="given_name"
                rules={[{ required: true }]}
                initialValue={custInfo.given_name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="family_name"
                rules={[{ required: true }]}
                initialValue={custInfo.family_name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[{ required: true }]}
                initialValue={custInfo.phone_number}
                type="hidden"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                initialValue={custInfo.address}
              >
                <Input />
              </Form.Item>

              <Form.Item label="City" name="city" initialValue={custInfo.city}>
                <Input />
              </Form.Item>

              <Form.Item
                label="State"
                name="state"
                initialValue={custInfo.state}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Zip Code"
                name="zip_code"
                initialValue={custInfo.zip_code}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                initialValue={custInfo.country}
              >
                <Input />
              </Form.Item>
              {/* Delete profile modal */}
              <Form.Item>
                {isRegistered ? (
                  <Button
                    type="primary"
                    onClick={() => setShowDelete(true)}
                    danger
                  >
                    Delete Profile
                  </Button>
                ) : null}
                <Modal
                  title="Are you sure you want to delete your profile?"
                  visible={showDelete}
                  onOk={() => {
                    deleteCustomerProfile();
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
              </Form.Item>
            </Form>
          </>
        ) : (
          // Loading view for when submitted
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

export default RenderFormPO;
