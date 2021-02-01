import {DatePicker, Alert, Form, Input, Button, Select, Card } from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
const { Option } = Select;

function Rent() {

  const NOSUCHCUSTOMER = -1;
  const CUSTOMERHASVEHICLEINRENT = 2;
  const CUSTOMERGOODTOGO = 1;

  const history = useHistory();

  const [findCustomer, setFindCustomer] = useState(0);
  const [success, setSuccess] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [rent, setRent] = useState(null);

  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [customer, setCustomer] = useState("");
  const [hours, setHours] = useState(0);

  const config = {
    rules: [{ required: true, message: 'Please select time!' }],
  };
    
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
    
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().endOf('day');
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 8),
      disabledMinutes: () => range(1, 60),
    };
  }

  function onClose(e) {
    setFindCustomer(0);
    console.log(e, 'I was closed.');
  };

  useEffect(async () => {
    await axios.get("/api/vehicles/")
      .then(response => setAvailableVehicles(response.data))
      .catch(event => console.log(event));
  },[]);

  async function checkCustomerID(customerId) {
    var cus = await axios.get("api/customers/" + customerId, {customerId : customerId})
      .then(response => response.data);
      
    setFindCustomer(cus === "" ? NOSUCHCUSTOMER : 0);
      
    if (cus !== "") {
      setCustomer(cus);
      var rents = await axios.get("api/rents/" + cus.id + "?isReturned=false")
        .then(response => response.data);
      
      setFindCustomer(rents.length === 0 ? CUSTOMERGOODTOGO : CUSTOMERHASVEHICLEINRENT);        
    }
  }
       
  async function onFinish(values) {
    const dateTimeValue = values['date-time-picker'].format("YYYY-MM-DDTHH:00:00.000+00:00");
    const vehicleId = availableVehicles[values['vehicle']].id; 

    const hours = parseInt((new Date(dateTimeValue).getTime() - new Date().getTime())/3600000);

    setHours(hours);

    let rent = await axios.post("/api/rents/", 
      {
        customerAutoId :  customer.id,
        vehicleId : vehicleId,
        returnTimestamp : dateTimeValue
      }).then(response => response.data)
      .catch(error => console.log(error));
    
    if (rent) {
      setVehicle(availableVehicles[values['vehicle']]);
      setRent(rent);
      setSuccess(true);
    }
  };
    
  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  function updateInputState(event) {
    setCustomerId(event.target.value)
  };

  function getPledge() {
    if (customer.customerType === "regular") {
      if (vehicle.vehicleType.startsWith("L") || 
        vehicle.vehicleType.startsWith("M") ||
        vehicle.vehicleType.startsWith("N")) {
        return 100;
      } else {
        return 300;
      }
    }
    return 0;
  }
  
  if (success) {
    const pledge = getPledge();
    return (
    <>
    <Card>
      You successfully ordered one <i>{vehicle.vehicleType}</i> vehicle. 
      You can pick up your vehicle at <strong>{vehicle.vehicleLocation}</strong>.
      <br/>
      {customer.customerType === "regular" ? <text>As a regular customer,
          you need to pay <b>{pledge}</b> euro for pledge. </text> : null}
      <br></br>
      You choose to rent the vehicle for <b>{hours}</b> hours.
      You need to pay total <b>{pledge + rent.fee}</b> euro. Please proceed to payment.
    </Card>
    <Button type="primary" onClick={() => history.push({
      pathname : '/pay',
      state : { fee : pledge + rent.fee }
    })}>Pay</Button>
    </>
    );
  }
    
  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="customer ID"
        name="customerId"
        rules={[{ required: true, message: 'Please input your CRS ID!' }]}
      >
        <Input onChange= {updateInputState}/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button  onClick={() => checkCustomerID(customerId)}>Validate ID</Button>
      </Form.Item>

      <Form.Item name="vehicle" label="vehicle" rules={[{ required: true }]}>
        <Select
          placeholder="Select an available vehicle that you want"
          allowClear
          disabled={findCustomer === CUSTOMERGOODTOGO ? false : true}
        >
          {availableVehicles.map((vehicle, index) => 
          <Option value={index}>{vehicle['vehicleType']}</Option>)}
        </Select>
      </Form.Item>
        
      <Form.Item name="date-time-picker" label="Return time" {...config}>
        <DatePicker
          disabledTime={disabledDateTime}
          disabledDate={disabledDate}
          disabled={findCustomer === CUSTOMERGOODTOGO ? false : true}
          style={layout} 
          showTime={{hideDisabledOptions: true, defaultValue: moment('09:00', 'HH:mm')}} 
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
  
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">submit</Button>
      </Form.Item>

      {findCustomer !== NOSUCHCUSTOMER ? null : 
        <Alert
          message="Error"
          description="There is no such customer ID!"
          type="error"
          showIcon
          closable
          onClose={onClose}
        />
      }

      {findCustomer === CUSTOMERHASVEHICLEINRENT ? 
        <Alert
          message="Error"
          description="You have a vehicle not returned!"
          type="error"
          showIcon
          closable
          onClose={onClose}
        /> : null
      }

      {findCustomer === CUSTOMERGOODTOGO ? 
        <Alert
          message="Success Tips"
          description="ID is valid. You can now choose a vehicle and return time."
          type="success"
          showIcon
          closable
        /> : null
      }
    </Form>
  );
}

export default Rent;