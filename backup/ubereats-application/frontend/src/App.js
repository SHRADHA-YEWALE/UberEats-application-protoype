import './App.css';

import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React, { useState } from 'react';
import Axios from 'axios';
import CustSignUp from './components/Signup/CustomerSignup.js';
import NavigationBar from './components/Navbar/Navbar.js';
import NavigationHomeBar from './components/Navbar/NavbarHome.js';
import Landing from './components/Landing/Landing.js';
import Login from './components/Login/Login.js';
import CustHome from './components/Home/custHome.js';
import RestoHome from './components/Home/restoHome.js';


function App() {

  const CustSignUpContainer = () => (
    
    <div className="Container">
      <NavigationBar />
      <Landing />
      <Route path="/custSignUp" component={CustSignUp} />
    </div>
  );

  const LoginContainer = () => (
    
    <div className="Container">
      <NavigationBar />
      <Landing />
      <Route path="/login" component={Login} />
    </div>
  );

  const CustHomeContainer = () => (
    
    <div className="Container">
      <NavigationHomeBar />
      <Landing />
      <Route path="/custHome" component={CustHome} />
    </div>
  );

  const RestoHomeContainer = () => (
    
    <div className="Container">
      <NavigationHomeBar />
      <Landing />
      <Route path="/restoHome" component={RestoHome} />
    </div>
  );

  const DefaultContainer = () => (
    <div>
      <div>
        <NavigationBar />
        <Route path="/" exact component={Landing} />
      </div>
    </div>
  );


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/custSignUp" component={CustSignUpContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/custHome" component={CustHomeContainer} />
          <Route exact path="/restHome" component={RestoHomeContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </div>
    </Router>
  );

}

export default App;
