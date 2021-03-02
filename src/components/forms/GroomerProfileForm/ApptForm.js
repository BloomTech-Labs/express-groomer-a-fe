import React from 'react';
import 'antd/dist/antd.css';
import { Select, Form, DatePicker, TimePicker, Button } from 'antd';
import axios from 'axios';

const ApptForm = () => {
  const { Option } = Select;

  const onFinish = fieldsValue => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
      service: fieldsValue['service'],
    };
    console.log('Received values of form: ', values);
    axios
      .post('https://reqres.in/api/users', values)
      .then(response => console.log(response))
      .catch(err => console.log(err));
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
          <Option value="bath">Bath</Option>
          <Option value="haircut">Haircut</Option>
          <Option value="nail-trim">Nail Trim</Option>
          <Option value="teeth-cleaning">Teeth Cleaning</Option>
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
