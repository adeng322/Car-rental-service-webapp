import {Button, Alert, Form, Input} from "antd";
import { useState } from "react";
import axios from 'axios';

function ReturnVehicle() {

  const[ifCustomer, setIfCustomer] = useState(true);
  const[success, setSuccess] = useState(0);
  const[rent, setRent] = useState(null);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
    
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  function onClose(e) {
    setIfCustomer(true);
    console.log(e, 'I was closed.');
  };

  async function onFinish(values) {
    const customerId = values['customerId'];
    const cus = await axios.get("api/customers/" + customerId, {customerId : customerId})
      .then(response => response.data);
    
    setIfCustomer(cus === "" ? false : true);
    
    const re = await axios.get("/api/rents/return?customerAutoId=" + cus.id)
      .then(response => response.data);
    console.log(re);    

    if (re !== "") {
      setRent(re);
      if(re.overtime === 0) setSuccess(1);
      if (re.overtime > 0) setSuccess(2);
    } else {
      setSuccess(-1);
    }
  }

  if (success === 0) {
    return (
      <Form 
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        ifCustomer{ifCustomer ? "true" : "false"}
        <Form.Item
          label="customer ID"
          name="customerId"
          rules={[{ required: true, message: 'Please input your CRS ID!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">submit</Button>
        </Form.Item>

        {!ifCustomer ? 
          <Alert
            message="Error"
            description="There is no such customer ID!"
            type="error"
            showIcon
            closable
            onClose={onClose}
          /> : null}
      </Form>
    );
  }

  if (success === -1) {
    return (
      <Alert
        message="Informational Notes"
        description="You have no non-returned vehicle."
        type="info"
        showIcon
      />
    );
  }

  if (success === 1) {
    return (
      <Alert
        message="Success Tips"
        description="You have returned the vehicle!"
        type="success"
        showIcon
      />
    );
  }

  if (success === 2) {
    return (
      <Alert
        message="Warning"
        description="You are late for your return!"
        type="warning"
        showIcon
        closable
      />
    );
  }
}

export default ReturnVehicle;