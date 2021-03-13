import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import ApptForm from '.././common/ApptForm';

const ApptModal = () => {
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
    <>
      <Button type="primary" onClick={showModal}>
        Schedule Appointment now!
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ApptForm />
      </Modal>
    </>
  );
};

export default ApptModal;
