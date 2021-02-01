import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Button, Alert, Card} from 'antd';

function Pay() {
  const amount = useLocation().state.fee;
  const [paid, setPaid] = useState(0);
  const [cashBack, setCashBack] = useState({})
  const [notEnough, setNotEnough] = useState(false)

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
    
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

  function roundUp(amountToPayBack) {
    var cents = amountToPayBack % 1;
    if (cents > 0.9) {
        cents = 1;
    } else if (cents > 0.8) {
        cents = 0.9;
    } else if (cents > 0.7) {
        cents = 0.8;
    } else if (cents > 0.6) {
        cents = 0.7;
    } else if (cents > 0.5) {
        cents = 0.6;
    } else if (cents > 0.4) {
        cents = 0.5;
    } else if (cents > 0.2) {
        cents = 0.4;
    } else if (cents > 0.1) {
        cents = 0.2
    }
    amountToPayBack = (amountToPayBack / 1 | 0) + cents;
    return amountToPayBack;
  }
  
  function onFinish(values) {
    const euro50 = parseInt(values["euro50"]) ? parseInt(values["euro50"]) :  0;
    const euro20 = parseInt(values["euro20"]) ? parseInt(values["euro20"]) : 0;
    const euro10 = parseInt(values["euro10"]) ? parseInt(values["euro10"]) : 0;
    const euro5 = parseInt(values["euro5"]) ? parseInt(values["euro5"]) : 0;
    const euro2 = parseInt(values["euro2"]) ? parseInt(values["euro2"]) : 0;
    const euro1 = parseInt(values["euro1"]) ? parseInt(values["euro1"]) : 0;
    const cents50 = parseInt(values["cents50"]) ? parseInt(values["cents50"]) : 0;
    const cents20 = parseInt(values["cents20"]) ? parseInt(values["euro20"]) : 0;
        
    var paidAmount = euro50 * 50 + euro20 * 20 + euro10 * 10 + euro5 * 5 + euro2 * 2 + euro1 + cents50 * 0.5 + cents20 * 20;
    
    if (paidAmount < amount) setNotEnough(true); 
    if (paidAmount >= amount) {
      setPaid(1);
      var amountToPayBack = paidAmount - amount;
      amountToPayBack = roundUp(amountToPayBack);
      
      var update = {
        paidAmount : paidAmount,
        changes : amountToPayBack,
        euro50 : amountToPayBack / 50 | 0 ,
        euro20 : amountToPayBack % 50 / 20 | 0,
        euro10 : amountToPayBack % 50 % 20 / 10 | 0,
        euro5 : amountToPayBack % 50 % 20 % 10 /5 | 0,
        euro2 : amountToPayBack % 50 % 20 % 10 % 5 / 2 | 0,
        euro1 : amountToPayBack % 50 % 20 % 10 % 5 % 2 / 1 | 0,
        cents50 : amountToPayBack % 50 % 20 % 10 % 5 % 2 % 1 / 0.5 | 0,
        cents20 : (amountToPayBack % 50 % 20 % 10 % 5 % 2 % 1 % 0.5 / 0.2 | 0) + 
          (amountToPayBack % 50 % 20 % 10 % 5 % 2 % 1 % 0.5 % 0.2 > 0.01 ? 1 : 0)
      }
      setCashBack(update);
    }    
  }

  if (paid === 0) {
    return (
      <>
      <text>
        The amount to be paid is {amount} euro. Please pay with your banknotes and coins.
      </text>
      <br/>
      <Form
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          {...formItemLayout}
          name="euro50"
          label="50 euro"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="euro20"
          label="20 euro"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="euro10"
          label="10 euro"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="euro5"
          label="5 euro"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="euro2"
          label="2 euro"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="euro1"
          label="1 euro"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="cents50"
          label="50 cents"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="cents20"
          label="20 cents"
        >
          <Input/>
        </Form.Item>

        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
              finish payment
          </Button>
        </Form.Item>

        {!notEnough ? null : 
          <Alert
            message="Error"
            description="You are not paying enough!"
            type="error"
            showIcon
            closable
          />
        }
      </Form>
      </>
    );
  }

  if (paid === 1) {
    return (
      <Card>
        Your have successfully paid for your vehicle! Here are your changes:
        {cashBack.euro50 > 0 ? <text><br/>{cashBack.euro50} * 50 euro</text> : null}
        {cashBack.euro20 > 0 ? <text><br/>{cashBack.euro20} * 20 euro</text> : null}
        {cashBack.euro10 > 0 ? <text><br/>{cashBack.euro10} * 10 euro</text> : null}
        {cashBack.euro5 > 0 ? <text><br/>{cashBack.euro5} * 5 euro</text> : null}
        {cashBack.euro2 > 0 ? <text><br/>{cashBack.euro2} * 2 euro</text> : null}
        {cashBack.euro1 > 0 ? <text><br/>{cashBack.euro1} * 1 euro</text> : null}
        {cashBack.cents50 > 0 ? <text><br/>{cashBack.cents50} * 50 cents</text> : null}
        {cashBack.cents20 > 0 ? <text><br/>{cashBack.cents20} * 20 cents</text> : null}
        <br/>
        The bill was {amount} euro. You have paid {cashBack.paidAmount} euro. In total,
        we pay you back <b>{cashBack.changes} euro.</b>
      </Card>
    );
  }
}

export default Pay;