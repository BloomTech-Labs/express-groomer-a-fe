import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import ApptForm from '../GroomerProfileForm/ApptForm';

const ApptModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    console.log('Appointment model props', props),
    (
      <>
        <Button type="primary" onClick={showModal}>
          Schedule Appointment!
        </Button>
        <Modal
          title="Schedule Appointment"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ApptForm props={props} />
        </Modal>
      </>
    )
  );
};

export default ApptModal;
