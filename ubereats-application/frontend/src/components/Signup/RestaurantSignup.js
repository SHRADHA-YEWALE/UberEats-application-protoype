import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantSignup } from '../../actions/signupRoleActions';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NavigationBar from '../Navbar/Navbar';
import Landing from '../Landing/CustomerHome.js';
import './Signup.css';
import { restaurantSignUpMutation } from "../../mutation/mutation";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

class RestaurantSignup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateForm = () => {
        let error = {};
        if (this.state.name === "") error.name = "Name should not be blank";
        //if (!isEmail(userInfo.email)) error.email = "Please enter valid mail";
        if (this.state.email_id === "") error.email = "Email should not be blank";
        if (this.state.password === "")
          error.password = "Password should not be blank";
        this.setState({
          error
        });
        return error;
      };

    onSubmit = async e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("name", this.state.name);
        console.log("email", this.state.email_id);
        console.log("password", this.state.password);
        console.log("location", this.state.location);

        const error = this.validateForm();
        if (Object.keys(error).length == 0) {
          let {mutationResponse} = await this.props.restaurantSignUpMutation({
            variables: {
                name: this.state.name,
                email: this.state.email_id,
                password: this.state.password,
                location: this.state.location,
            }
          });
        console.log("Restaurant Signup successful", mutationResponse);
        this.setState({
            authFlag: true,
            
            });
          
        } else {
            this.setState({
                authFlag: true
              });
            console.log("Error", error);
            this.setState({ error });
        }
    };

    render() {
        console.log('rendering the page');
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";

        console.log('rendering the page');
        if (this.state.authFlag) {
        console.log("Control goes to login page from here");
        redirectVar = <Redirect to="/restaurantLogin" />;
        } else redirectVar = <Redirect to="/restaurantSignup" />;
        //Get the username from local or session storage.
        
        return (
            <div className= "backGroundLayer">
                {redirectVar}
                    <div> <NavigationBar /> </div>
                    <div className="container"> 
                    <div><h2><u>Restaurant Signup</u></h2></div> <br/>
                                <form onSubmit={this.onSubmit}>
                                    <table>
                                    <tr>    
                                 
                                        <td><label className='floatLabel'><b> Restaurant Name </b></label></td>
                                        <td><input type="text" className="input_field" name="name" onChange={this.onChange} placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required /></td>
                    
                                    </tr>
                                    <tr>
                              
                                        <td><label className='floatLabel'><b> Email Id </b></label></td>
                                        <td><input type="email" className="input_field" name="email_id" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required /></td>
                             
                                    </tr>
                                    <tr>
                                    
                                        <td><label className='floatLabel'><b> Password </b></label></td>
                                        <td><input type="password" className="input_field" name="password" onChange={this.onChange} placeholder="Password" required /></td>
                                 
                                    </tr>
                                    <tr>    
                                 
                                        <td><label className='floatLabel'><b> Restaurant Location </b></label></td>
                                        <td><input type="text" className="input_field" name="location" onChange={this.onChange} placeholder="Location" pattern="^[A-Za-z0-9 ]+$" required /></td>
                    
                                    </tr>
                                    </table>
                                    <div style={{ color: "#ff0000" }}>{message}</div><br />
                                    <button type="submit" className="btn-primary"><center>Signup</center></button><br /><br />
                                    <div><Link to='/customerSignup' className="signupLinkClass"><b>Signup as Customer</b></Link></div><br />
                                                                      
                                </form>
                    </div>  <br/> 
                    </div>
            
        )
    }
}

export default compose(graphql(restaurantSignUpMutation, { name: "restaurantSignUpMutation" }))(
    RestaurantSignup
  );