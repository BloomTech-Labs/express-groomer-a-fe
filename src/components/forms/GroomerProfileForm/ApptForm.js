import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { UsersContext } from '../../../state/contexts/UsersContext';
import { Select, Form, DatePicker, Input, TimePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';

const ApptForm = () => {
  const { Option } = Select;

  const { userInfo } = useContext(UsersContext);

  const onFinish = (event, fieldsValue )=> {    
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
      service: fieldsValue['service'],
      'cust-name': userInfo.name,
      'cust-email': userInfo.email,
      phone: fieldsValue['phone'],
    };
    console.log(
      'Received values of form: ',
      values,
      userInfo.name,
      userInfo.email
    );

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
        message: 'Please select date and time',
      },
    ],
  };

  const disablePastDates = current =>
    current && current < moment().endOf('day');

  const handleSubmit = (event) => {

  }

  return (
    <Form name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="date-picker" label="Date" {...config}>
        <DatePicker disabledDate={current => disablePastDates(current)} />
      </Form.Item>

      <Form.Item name="time-picker" label="Time" {...config}>
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
        <Select placeholder="Please select a service">
          <Option value="fur-trimming">Fur-Trimming</Option>
          <Option value="nail-trimming">Nail-Trimming</Option>
          <Option value="fur-styling">Fur-Styling</Option>
          <Option value="ear-cleaning">Ear Cleaning</Option>
          <Option value="nail-filing">Nail Filing</Option>
          <Option value="nail-capping">Nail Capping</Option>
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
