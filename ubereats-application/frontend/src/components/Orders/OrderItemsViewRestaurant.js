import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Container, Table, Card, Form, Row } from "react-bootstrap";
import Navigationbar from '../Navbar/RestaurantNavbarHome';
import axios from 'axios';
import endPointObj from '../../endPointUrl.js';

class OrderItemsViewRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order_details: {},
            order_items: {},
            o_status:""
        };
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                order_details: this.props.location.state.order_details,
                prevPath: this.props.location.state.prevPath
            });

            axios.get(endPointObj.url + "/orders/orderitems/" + this.props.location.state.order_details.order_id)
                .then(response => {
                    if (response.data) {
                        console.log("order item view", response.data);
                        this.setState({
                            order_items: response.data,
                            order_status: response.data.order_status
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value, 
            o_status: e.target.value
        });
        console.log("order_status", this.state.order_status);
    };

    onUpdate = (e) => {
        e.preventDefault();

        const data = {
            order_status : this.state.o_status,
            order_id : this.state.order_id
        }
    
        axios.post(endPointObj.url + '/orders/updateStatus', data)
            .then(response => {
                this.setState({
                    message: response.data.status
                });
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        message: err.response.data
                    });
                }
            });
    };


    render() {
        let order_details;
        let items;
        let itemsRender = [];
        let itemsCard = null;
        let redirectVar = null;

        if (!localStorage.getItem("user_id") || !this.props.location.state) {
            redirectVar = <Redirect to="/" />;
        }
       
        if (this.state && this.state.order_details && this.state.order_items) {
            order_details = this.state.order_details;
            items = this.state.order_items;
            this.state.order_id = order_details.order_id;
            this.state.o_status = order_details.order_status;
            if (items.length > 0) {
                items.forEach(item => {
                    let itemRow = (
                        <tr>
                            <td colSpan="4" align="center">{item.item_name}</td>
                            <td colSpan="4" align="center">{item.quantity}</td>
                        </tr>
                    );
                    itemsRender.push(itemRow);
                });
            }
            itemsCard =
                (
                    <center>
                        <Card style={{ width: "40rem" }}>
                            <Card.Title>
                                <br />
                                <h3>{order_details.resto_name}</h3>
                            </Card.Title>
                            <Card.Body>
                                <b>Order Details</b>
                                <Table>
                                    <thead align="center">
                                        <th colSpan="4">Item Name</th>
                                        <th colSpan="4">Quantity</th>
                                    </thead>
                                    <tbody>
                                        {itemsRender}
                                        <br />
                                        <br />
                                        <tr>
                                            <td colSpan="4">Customer Name:</td>
                                            <td>{order_details.cust_name}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">Delivery Address:</td>
                                            <td>{order_details.address}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">Contact Number:</td>
                                            <td>{order_details.phone_number}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                                <Button variant="secondary" href={this.state.prevPath}>Back</Button>
                            </Card.Body>
                        </Card>

                    </center>
                );
            return (
                <div>
                    <Navigationbar /><br />
                    {redirectVar}
                    <Container className="justify-content">
                        {itemsCard}
                        <form onSubmit={this.onUpdate}>
                        <select name="o_status"  onChange={this.onChange} style={{ width: '10em', height: '2em'}}>
                            <option value="ORDER RECEIVED">ORDER RECEIVED</option>
                            <option value="PREPARING">PREPARING</option>
                            <option value="PICKUP READY">PICKUP READY</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="ORDER_CANCELLED">ORDER_CANCELLED</option>
                        </select>
                        <Button type="submit" variant="success">Update Order Status</Button>
                        </form>
                    </Container>
                </div>
            );
        }
    }
}

export default OrderItemsViewRestaurant;