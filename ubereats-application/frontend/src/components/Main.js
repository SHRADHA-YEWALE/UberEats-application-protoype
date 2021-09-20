import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CustomerSignup from './Signup/CustomerSignup';
import NavigationBar from './Navbar/Navigationbar.js';
import RestaurantSignup from './Signup/RestaurantSignup.js';
import CustomerLogin from './Login/CustomerLogin.js';


class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/customerSignup" component={CustomerSignup} />
                <Route path="/restaurantSignup" component={RestaurantSignup} />
                <Route path="/customerLogin" component={CustomerLogin} />
                <Route path="/navBar" component={NavigationBar} />

            </div>
        );
    }
}
export default Main;