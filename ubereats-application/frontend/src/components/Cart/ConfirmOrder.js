import React, { Component } from 'react';
import { Redirect } from 'react-router';
import endPointObj from '../../endPointUrl.js';
import { Button, Alert, Container, Table, Card } from "react-bootstrap";
import Navigationbar from '../Navbar/CustomerNavbarHome';
import axios from 'axios';

class ConfirmOrder extends Component {
    constructor(props) {
        super(props);

        this.getUserProfile();
        this.placeOrder = this.placeOrder.bind(this);
    }
    componentWillMount() {
        document.title = "Your Order";
        if (this.props.location.state) {
            this.setState({
                restaurant: this.props.location.state.restaurant,
                cart_items: this.props.location.state.cart_items,
                discount: this.props.location.state.discount,
                delivery: this.props.location.state.delivery,
                tax: this.props.location.state.tax,
                sub_total: this.props.location.state.subTotal,
                total: this.props.location.state.total
            });
            
        }
    };

    getUserProfile = () => {
        axios.get(endPointObj.url + "/profile/customer/" + localStorage.getItem("user_id"))
        .then(response => {
            if(response.data){
                this.setState({
                    address: response.data.address,
                    phone_number: response.data.phone_number
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    placeOrder = (e) => {

        let data = {
            user_id: localStorage.getItem("user_id"),
            res_id: this.state.restaurant.user_id,
            order_status: 'NEW_ORDER',
            sub_total: this.state.sub_total,
            discount: (this.state.discount * this.state.sub_total / 100).toFixed(2),
            delivery: this.state.delivery,
            tax: (this.state.tax * this.state.sub_total / 100).toFixed(2),
            total: this.state.total,
            cart_items: this.state.cart_items
        }
        console.log("cart_items", data.cart_items);
        axios.post(endPointObj.url +"/cart/placeorder", data)
            .then(response => {
                console.log("put order response", response);
                if (response.data) {
                    localStorage.removeItem("cart_items");
                    localStorage.removeItem("cart_res_id");
                    this.setState({
                        message: response.data
                    });
                    alert("Your order Successfully placed!");
                }
            })
            .catch(error => {
                this.setState({
                    message: "ORDER_ERROR"
                });
            });
    };

    render() {
        let redirectVar = null,
            order = null,
            message = null;

        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "1") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.message === "ORDER_PLACED") {
            redirectVar = <Redirect to="/orders" />
        }
        else if (this.state.message === "ORDER_ERROR") {
            message = <Alert variant="warning">There was some error processing your order!</Alert>
        }
        else if (!localStorage.getItem("cart_items") || localStorage.getItem("cart_items").length === 0) {
            redirectVar = <Redirect to="/cart" />
        }

        if (this.state) {
            order = (
                <div>
                    <Card style={{width: "40rem", height: "35rem"}}>
                        <Card.Title>
                            <br />
                            <h3>{this.state.restaurant.name}</h3>
                            {this.state.restaurant.address} | {this.state.restaurant.zipcode}
                        </Card.Title>
                        <Card.Body>
                            <Table style={{ width: "90%" }}>
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Your purchase</td>
                                        <td align="center">$ {this.state.sub_total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Tax ({this.state.tax}%)</td>
                                        <td align="center">$ {(this.state.sub_total * this.state.tax / 100).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Discounts ({this.state.discount}%)</td>
                                        <td align="center">$ {(this.state.sub_total * this.state.discount / 100).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Delivery Charges</td>
                                        <td align="center">$ {this.state.delivery.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"><b>Total</b></td>
                                        <td align="center"><b>$ {this.state.total}</b></td>
                                    </tr>
                                    <br/>
                                    <tr>
                                        <td colSpan="4">Delivery Address</td>
                                        <td align="center">{this.state.address}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Contact Number</td>
                                        <td align="center">{this.state.phone_number}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <center>
                                <Button variant="success" onClick={this.placeOrder}>Confirm Order</Button>&nbsp; &nbsp;
                                <Button variant="secondary" href="/customerHome">Cancel</Button>
                            </center>
                            <br />
                        </Card.Body>
                    </Card>
                    <br />
                    <Button variant="info" href="/cart">Back to Cart</Button>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <Navigationbar /> <br />
                
                    <h3 style = {{ paddingLeft:"18em" }}>Confirm your Order</h3><br/>
                    <center>
                        {message}
                        {order}
                        <br /><br />
                    </center>
               
            </div >
        )
    }
}
export default ConfirmOrder;