import React , { useState, Component }  from 'react'
import UbLogo from '../../assets/uberEatsLogo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { connect } from 'react-redux';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { userLogout } from '../../actions/customerLogin.js';


class CustomerNavbarHome extends Component {

    constructor() {
        super();
        this.state = {
          name: localStorage.getItem("name")
        }
      }
    
      //handle logout to destroy the cookie
    handleLogout = () => {
        window.localStorage.clear();
        this.props.userLogout();
    };

    render() {  
       
       
        return (
        <div className = "navbar">
            <div className = "leftSide">
                <label className="ubLogo"><b>Uber</b></label> <label className="eatsLogo"><b>Eats</b></label> 
            </div>    
            <div className = "rightSide">
                <Link to="/customerHome"> Home </Link> 
                <Link to="/customerProfile"> Profile </Link>
                <Link to="/customerLogin"> Logout </Link>
                
            </div>    
        </div>
        );
    }  
}

export default connect(null, { userLogout })(CustomerNavbarHome);
