import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { Select, Form, DatePicker, TimePicker, Button } from 'antd';

import { APIContext } from '../../../state/contexts/APIContext';
import { GroomersContext } from '../../../state/contexts/GroomersContext';
import { useOktaAuth } from '@okta/okta-react';

const ApptForm = props => {
  const { Option } = Select;

  const { authState } = useOktaAuth();
  const { groomerServices } = useContext(GroomersContext);
  const pathway = props.props.props.props.match.params.id;
  const { postAppointment } = useContext(APIContext);

  const onFinish = fieldsValue => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      date: fieldsValue['date-picker'].format('YYYY-MM-DD'),
      startTime: fieldsValue['time-picker'].format('HH:mm:ss'),
      endTime: '23:59',
      services: [fieldsValue['service']],
    };
    postAppointment(authState, pathway, values);
    console.log('Received values of form: ', values);
  };

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  return (
    <Form name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="date-picker" label="Date" {...config}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="time-picker" label="Time" {...config}>
        <TimePicker use12Hours format="h:mm a" />
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
        <Select placeholder="Please select a service">
          {groomerServices.map(service => {
            return (
              <Option key={service.id} value={service.id}>
                {service.service_name}, ${service.services_price}
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
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ApptForm;
