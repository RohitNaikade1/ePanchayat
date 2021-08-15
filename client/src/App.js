import React, { useEffect } from 'react';
import './App.css';
import AdminRouter from './components/onlyAdmin';
import privateRouter from './privateRouter';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import Header from './components/Headers & footers/header';
import Home from './components/Home/Home';
import Schemes from './components/schemes/Schemes';
import Payments from './components/payment/Payments';
import About from './components/about us/about us';
import Village from './components/about village/About';
import Loginpage from './components/loginPage';
import Activate from './components/login/activate';
import Reset from './components/login/reset';
import Forget from './components/login/forget';
import PaymentReceipt from './components/payment receipt/PaymentReceipt'
import Footer from './components/Headers & footers/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserAction } from '../src/Redux/actions/getUserAction';
import Residence from './components/Residence/Residence';
import Revenue from './components/Revenue tax/Revenue';
import AdHome from './components/admin center/pages/adHome';
import AdRevenue from './components/admin center/pages/adRevenue';
import AdRevenueReceipt from './components/admin center/pages/adRevenueReceipt';
import AdSchemes from './components/admin center/pages/adSchemes';
import AdVillager from './components/admin center/pages/adVillager';
import adNotify from './components/admin center/pages/adNotify';
import AdVillage from './components/admin center/pages/adVillage';
import AdResidence from './components/admin center/pages/adResidence';
import ReactNotification from 'react-notifications-component';
import history from './helpers/history';
function App(props) {
  useEffect(() => {
    props.fetch_user()
  }, [])
  return (
    <>
      <BrowserRouter history={history}>
      <ReactNotification />
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Loginpage}></Route>
          <Route path="/schemes" component={Schemes}></Route>
          <Route path="/village" component={Village}></Route>
          <Route path="/payment" component={Payments}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/residence" component={Residence}></Route>
          <Route path="/revenue" component={Revenue}></Route>
          <Route path="/activate/:token" component={Activate}></Route>
          <Route path="/resetPassword/:token" component={Reset}></Route>
          <Route path="/forgotPassword" component={Forget}></Route>
          <AdminRouter path="/adVillager" component={AdVillager}></AdminRouter>
          <Route path="/payreceipt" component={PaymentReceipt}></Route>
          <AdminRouter path="/adHome" component={AdHome}></AdminRouter>
          <AdminRouter path="/adRevenue" component={AdRevenue}></AdminRouter>
          <AdminRouter path="/adRevenueReceipt" component={AdRevenueReceipt}></AdminRouter>
          <AdminRouter path="/adSchemes" component={AdSchemes}></AdminRouter>
          <AdminRouter path="/adVillage" component={AdVillage}></AdminRouter>
          <AdminRouter path="/adResidence" component={AdResidence}></AdminRouter>
          <AdminRouter path="/adNotify" component={adNotify}></AdminRouter>
        </Switch>
        <Footer />
      </BrowserRouter>

    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user: () => { dispatch(getUserAction()) }
  }
}
export default connect(null, mapDispatchToProps)(App);
