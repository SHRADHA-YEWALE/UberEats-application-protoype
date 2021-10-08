import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navigationbar from '../Navbar/CustomerNavbarHome';
import CustomerOrderHistory from './CustomerOrderHistory';
import RestaurantOrderHistory from './RestaurantOrderHistory';

class OrderHistory extends Component {
    componentWillMount(){
        document.title = "Your Orders";
    }
    render() {
        let ordersComponent = null;
        let redirectVar = null;
        if (localStorage.getItem("user_id")) {
            if (localStorage.getItem("is_owner") === "1")
                ordersComponent = <RestaurantOrderHistory/>
            else
                ordersComponent = <CustomerOrderHistory />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar /><br/>
                {ordersComponent}
            </div>
        )
    }
}
export default OrderHistory;