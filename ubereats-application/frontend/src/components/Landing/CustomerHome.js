import React, { Component } from 'react';
import { Redirect } from 'react-router';
import NavbarHome  from '../Navbar/CustomerNavbarHome.js';
import './Landing.css';

class CustomerHome extends Component {
  render() {
      let redirectVar = null;
        if (!localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/login" />
        }
      return (
        <div>
           <NavbarHome />
           
        </div>
   
      )
  }
}

export default CustomerHome;
