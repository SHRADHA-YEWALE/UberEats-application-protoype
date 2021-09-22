import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from '../Navbar/Navigationbar.js';
import Landing from '../Landing/Landing.js';
import '../Signup/Signup.css';
import './Login.css'
import { restaurantLogin } from '../../actions/restaurantLogin';


class RestaurantLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password
        }

        this.props.restaurantLogin(data);

        this.setState({
            loginFlag: 1
        });
    }

    render() {
        //console.log(this.props);
        let redirectVar = null;
        let message = ""
        if(this.props.user && this.props.user.user_id){
            console.log("Success");
            localStorage.setItem("email_id", this.props.user.email_id);
            localStorage.setItem("user_id", this.props.user.user_id);
            localStorage.setItem("name", this.props.user.name);
            redirectVar = <Redirect to="/home" />
        }
        else if(this.props.user === "NO_USER" && this.state.loginFlag){
            message = "User not find with the provided email id";
        }
        else if(this.props.user === "INCORRECT_PASSWORD" && this.state.loginFlag){
            message = "Invalid Password! Please enter correct password.";
        }
  
        console.log(this.props);
        return (
            <div className= "loginBackGroundLayer">
                {redirectVar}
                    <div> <NavigationBar /> </div>
                    <br/><br/>
                  
                   
                    <div className="container"> 
                    <h2><u>Restaurant Login</u></h2> <br/>
                                <form onSubmit={this.onSubmit}>
                                    <table>
                                    <tr>
                              
                                        <td><label className='floatLabel'><b> Username </b></label></td>
                                        <td><input type="email" className="input_field" name="email_id" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required /></td>
                             
                                    </tr>
                                    <tr>
                                    
                                        <td><label className='floatLabel'><b> Password </b></label></td>
                                        <td><input type="password" className="input_field" name="password" onChange={this.onChange} placeholder="Password" required /></td>
                                 
                                    </tr>
                                    </table>
                                    <div style={{ color: "#ff0000" }}>{message}</div><br />
                                    <button type="submit" className="btn-primary"><center>Login</center></button><br /><br />
                                    <div><Link to='/customerLogin'>Login as Customer</Link></div><br />
                                                                      
                                </form>
                    </div> <br/> <br/>   
                    </div>
            
        )
    }
}

RestaurantLogin.propTypes = {
    restaurantLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return {user: state.login.user}
};

export default connect(mapStateToProps, { restaurantLogin })(RestaurantLogin);