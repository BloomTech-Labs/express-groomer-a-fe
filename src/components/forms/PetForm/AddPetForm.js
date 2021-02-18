import React, { useContext } from 'react';
import { Button, Modal, Row, Spin, Form, Input, Checkbox, Radio } from 'antd';
import { FormContext } from '../../../state/contexts/FormContext';
import { APIContext } from '../../../state/contexts/APIContext';
import { useOktaAuth } from '@okta/okta-react';

const AddPetForm = () => {
  const { authState } = useOktaAuth();

  // context state
  const {
    petFormVisible,
    setPetFormVisible,
    loading,
    setLoading,
    onPetFormFinishFailed,
    value,
    onRadioChange,
  } = useContext(FormContext);
  const { addNewPet } = useContext(APIContext);

  // modal specific functions
  const showModal = () => {
    setLoading(false);
    setPetFormVisible(true);
  };

  const handleCancel = () => {
    setPetFormVisible(false);
  };

  // this function will be used to handle pet form submit
  const onPetFormSubmit = async values => {
    setLoading(true);
    await addNewPet(authState, values);
    await setTimeout(() => {
      setPetFormVisible(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Pet
      </Button>
      <Modal
        okButtonProps={{ form: 'pet-form', key: 'submit', htmlType: 'submit' }}
        title="Pet Information"
        visible={petFormVisible}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        {loading === false ? (
          // The form
          <>
            <Form
              id={'pet-form'}
              name="basic"
              initialValues={{
                shots_current: false,
                spay_neuter: false,
              }}
              onFinish={onPetFormSubmit}
              onFinishFailed={onPetFormFinishFailed}
              layout={'vertical'}
            >
              <Form.Item
                label="Pet Name"
                name="pet_name"
                rules={[
                  {
                    required: true,
                    message: 'Pet name is required',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Breed"
                name="pet_breed"
                rules={[
                  {
                    required: true,
                    message: 'Pet breed is required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="pet_gender"
                rules={[
                  {
                    required: true,
                    message: 'Pet gender is required',
                  },
                ]}
              >
                <Radio.Group onChange={onRadioChange} value={value}>
                  <Radio value={'Male'}>Male</Radio>
                  <Radio value={'Female'}>Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Color"
                name="pet_color"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Temperament"
                name="pet_temperament"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Spayed / Neutered?"
                name="spay_neuter"
                checked="false"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                label="Current on vaccines?"
                name="shots_current"
                checked="false"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                label="Special requests for groomer"
                name="special_requests"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
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
    </>
  );
};

export default AddPetForm;
