import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React, { useState } from 'react';
import Axios from 'axios';
import SignUp from './components/Signup/Signup.js';
import NavigationBar from './components/Navbar.js';
import Landing from './components/Landing/Landing.js';
import Login from './components/Login/Login.js';
import Home from './components/Home/Home.js';



function App() {

  const SignUpContainer = () => (
    
    <div className="Container">
      <NavigationBar />
      <Landing />
      <Route path="/signup" component={SignUp} />
    </div>
  );

  const LoginContainer = () => (
    
    <div className="Container">
      <NavigationBar />
      <Landing />
      <Route path="/login" component={Login} />
    </div>
  );

  const HomeContainer = () => (
    
    <div className="Container">
      <NavigationBar />
      <Landing />
      <Route path="/home" component={Home} />
    </div>
  );

  const DefaultContainer = () => (
    <div>
      <div>
        <NavigationBar />

        <Route path="/" exact component={Landing} />
       
        <Route path="/signUp" component={SignUp} />
      </div>
    </div>
  );


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/home" component={HomeContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </div>
    </Router>
  );

}

export default App;
