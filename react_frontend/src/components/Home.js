import { Button, Row , Col} from 'antd';
import { useHistory } from 'react-router-dom';
function Home(){

  const history = useHistory();

  return (
    <Row justify="center">
      <Col span={12}>
        <img src={"/logo.gif"} alt="loading..." class="center"/>
      </Col>
      <Col span={4}>
        <Row justify="center">
          <Button block onClick={() => history.push('/newcustomer')}>New customer</Button>
        </Row>
        <br></br>
        <Row justify="center">
          <Button block onClick={() => history.push('/rent')}>Rent a vehicle</Button>
        </Row>
        <br></br>
        <Row justify="center">
          <Button block onClick = {() => history.push('/return')}>Return a vehicle</Button>
        </Row>
      </Col>
    </Row> 
  );
}

export default Home;