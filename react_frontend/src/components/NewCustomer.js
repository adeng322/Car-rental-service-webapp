import { Card, Button, Row , Col} from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function NewCustomer() {

  const history = useHistory();
  const [customerId, setCustomerId] = useState(null);

  const submit = async(type) => {
    await axios.post("api/customers/", {customerType : type})
      .then(response => setCustomerId(response.data.customerId))
  }
    
  if (!customerId) {
    return (
      <>
        <Row justify="center">
          <Col span={4}>
            <Button block onClick={() => submit('gold')}>Gold (10 EUR per month)</Button>
          </Col>
        </Row>
        <br/>
        <Row justify="center">
          <Col span={4}>
            <Button block onClick={() => submit('regular')}>Regular</Button>
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <Card>
        Your ID card number is: <b>{customerId}</b>
        <br/>
        Please keep this number in hand (better <b>copy</b> it as you need it if you click rent). 
        <br/>
        <i>You always need this customer ID when you rent or return a vehicle.</i>
        <br/><br/>
        <Row justify="center">
            <Button block onClick={() => history.push('/rent')}>Rent a vehicle now</Button>
        </Row>
      </Card>
    );
  }
}

export default NewCustomer;