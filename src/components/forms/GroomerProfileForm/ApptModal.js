import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import ApptForm from '../GroomerProfileForm/ApptForm';

const ApptModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button id="appt-modal-button" type="primary" onClick={showModal}>
        Schedule Appointment!
      </Button>
      <Modal
        footer={null}
        title="Schedule Appointment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ApptForm props={props} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default ApptModal;
