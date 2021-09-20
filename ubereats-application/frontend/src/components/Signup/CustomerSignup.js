import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customerSignup } from '../../actions/signupRoleActions';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NavigationBar from '../Navbar/Navigationbar.js';
import Landing from '../Landing/Landing.js';
import './Signup.css';

class CustomerSignup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        //prevent the page from refresh
        e.preventDefault();
        const custData = {
            name: this.state.name,
            email_id: this.state.email_id,
            password: this.state.password
        }

        this.props.customerSignup(custData);

        this.setState({
            signedUp: 1
        });
    }

    render() {
        console.log('rendering the page');
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        //Get the username from local or session storage.
        /*if (localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/Home" />
        }*/
        if (this.props.user === "USER_ADDED" && this.state.signedUp) {
            console.log("User successfully login");
            alert("You have registered successfully");
            redirectVar = <Redirect to="/customerLogin" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signedUp){
            message = "Username is already registered"
        }
        return (
            <div>
                {redirectVar}
                    <div> <NavigationBar /> </div>
                    <div> <Landing /></div>
                    <br/><br/><br/><br/>
                  
                   
                    <div className="container"> 
                    <h2><u>Customer Signup</u></h2> <br/>
                                <form onSubmit={this.onSubmit}>
                                    <table>
                                    <tr>    
                                 
                                        <td><label className='floatLabel'><b> Name </b></label></td>
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
                                    </table>
                                    <div style={{ color: "#ff0000" }}>{message}</div><br />
                                    <button type="submit" className="btn-primary"><center>Signup</center></button><br /><br />
                                    <div><Link to='/restaurantSignup'>Signup as Restaurant Owner</Link></div><br />
                                                                      
                                </form>
                    </div>    
                    </div>
            
        )
    }
}

CustomerSignup.propTypes = {
    customerSignup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.signup.user
});

export default connect(mapStateToProps, { customerSignup })(CustomerSignup);
