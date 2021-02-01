import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Home from "./components/Home";
import NewCustomer from "./components/NewCustomer"
import Rent from "./components/Rent"
import Pay from "./components/Pay"
import ReturnVehicle from './components/ReturnVehicle';

const { Header, Footer, Content } = Layout;

function App() {

  return (
    <Layout>
    <Header>Header</Header>
    <Content 
        className="site-layout-background"
        style={{padding: 24, margin: 0, minHeight: 280}}
    >               
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component={Home}/>
            <Route exact path = '/newcustomer' component={NewCustomer}/>
            <Route exact path = '/rent' component={Rent}/>
            <Route exact path = '/pay' component={Pay}/>
            <Route exact path = '/return' component={ReturnVehicle}/>
        </Switch>
    </BrowserRouter>
    </Content>
    <Footer style={{bottom: "0" }}>Created by Ai Deng</Footer>
    </Layout>
  );
}

export default App;
