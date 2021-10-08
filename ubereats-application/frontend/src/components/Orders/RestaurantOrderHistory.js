import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Container, Col, Row, Button, Alert, Form, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import endPointObj from '../../endPointUrl.js';
import Navigationbar from '../Navbar/RestaurantNavbarHome.js';

class RestaurantOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.getCompletedOrders();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUpdate = (e) => {
        e.preventDefault();
        
        let data = {
            status : this.order_status,
            order_id : this.order_id
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

    getCompletedOrders = () => {
        axios.get(endPointObj.url + "/orders/completedorders/restaurant/" + localStorage.getItem("user_id"))
            .then(response => {
                if (response.data) {
                    console.log("restaurant orders page", response.data);
                    this.setState({
                        completed_orders: response.data
                    });
                }
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
        let message = null;
        let orders = [];
        let orderCards = null;

        if (this.state && this.state.completed_orders) {
            orders = this.state.completed_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    this.state.order_id = order.order_id;
                    this.state.order_status = order.order_status;
                    return (
                        <Card style={{ width: "50rem", margin: "2%" }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{order.cust_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{order.address}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{order.phone_number}</Card.Subtitle>
                                        <br />
                                        <Card.Text>{order.order_date}</Card.Text>
                                    </Col>
                                    <Col align="center">
                                        <Link to={{ pathname: "/orders/details", state: {order_details: order, prevPath: "/orders/history"} }}>
                                            <Button variant="link">Order Details</Button>
                                        </Link>
                                        <Link to={{ pathname: "/orders/billing", state: {order_details: order, prevPath: "/orders/history"} }}>
                                            <Button variant="link">Billing Details</Button>
                                        </Link>
                                    </Col>
                                    <Col align="center">
                                        <form onSubmit={this.onUpdate}>
                                            <div style={{ width: "80%" }}>
                                                <input type="text" name="order_status" value={this.state.order_status} onChange={this.onChange} required/>
                                                <label>Order Status</label>
                                            </div><br/>
                                            <Button type="submit" variant="primary" className="submit-resto-btn-primary">Update Status</Button>
                                        </form>
                                        <br />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );

                });
            }
        }
        else {
            message = <Alert variant="warning">You did not complete any orders yet.</Alert>
        }
        return (
            <div>
                <Navigationbar /><br />
                <Container className="restaurantOrderHistory">
                    <h2>Customer orders</h2>
                    {message}
                    {orderCards}
                    <center>
                    <Button href="/RestaurantHome" style={{ width: "20rem", margin: "2%" }}> GO TO Home</Button>
                    </center>
                </Container>
            </div>
        )
    }
}
export default RestaurantOrderHistory;