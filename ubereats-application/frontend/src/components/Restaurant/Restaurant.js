import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import ItemCard from "./ItemCard"
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import NavigationBar from '../Navbar/CustomerNavbarHome.js';
import endPointObj from '../../endPointUrl.js';
import { Link } from "react-router-dom";
import '../Landing/Landing.css';


class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.setState({
            menu_sections: [],
            menu_items: []
        });
        this.sectionItems = this.sectionItems.bind(this);
        this.getSections();
        this.getMenuItems();
    }

    componentWillMount() {
        if (this.props.location.state) {
            document.title = this.props.location.state.res_name;
        }
    }

    getSections = () => {
        if (this.props.location.state) {
            axios.get(endPointObj.url + "/menu/sections/" + this.props.location.state.resto_id)
                .then(response => {
                    if (response.data[0]) {
                        this.setState({
                            menu_sections: response.data
                        });
                    }
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        console.log(err.response.data);
                    }
                });
        }
    };

    getMenuItems = () => {
        if (this.props.location.state) {
            axios.get(endPointObj.url + "/menu/items/" + this.props.location.state.resto_id)
                .then(response => {
                    if (response.data[0]) {
                        this.setState({
                            menu_items: response.data
                        });
                    }
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        console.log(err.response.data);
                    }
                });
        }
    };

    sectionItems = (menu_section) => {
        var itemsRender = [], items, item, section;


        if (this.state && this.state.menu_items && this.state.menu_items.length > 0) {
            items = this.state.menu_items.filter(menu_item => menu_item.menu_section_id === menu_section.menu_section_id);
            if (items.length > 0) {
                section = <h4>{menu_section.menu_section_name}</h4>;
                itemsRender.push(section);
                for (var i = 0; i < items.length; i++) {
                    item = <ItemCard menu_item={items[i]} />;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    render() {
        let redirectVar = null,
            section = null,
            renderOutput = [],
            resImageSrc = null,
            resName, resPhone, resAddress, resCuisine, resZIP,restoEmail,restoDescription,resTiming,
            restaurant = this.props.location.state;

        if (!localStorage.getItem("user_id") || !this.props.location.state) {
            redirectVar = <Redirect to="/home" />
        }

        if (restaurant) {
            resImageSrc = endPointObj.url + "/images/restaurant/" + restaurant.res_image;
            resName = restaurant.resto_name;
            restoEmail = restaurant.email_id;
            resZIP = restaurant.res_zip_code;
            resAddress = restaurant.location;
            resPhone = restaurant.phone_number;
            resCuisine = restaurant.res_cuisine;
            restoDescription = restaurant.resto_description;
            resTiming = restaurant.timings;
        }
        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            for (var i = 0; i < this.state.menu_sections.length; i++) {
                section = this.sectionItems(this.state.menu_sections[i]);
                renderOutput.push(section);
            }
        }
        return (
            <div>
                {redirectVar}
                <NavigationBar />

                <Card bg="info" text="white" style={{ width: "70rem", height: "15rem", margin: "2%" }}>
                    <Row>
                        <Col>
                            <Card.Img style={{ width: "18rem", height: "15rem" }} src={resImageSrc} />
                        </Col>
                        <Card.Body>
                            <Card.Title><h1>{resName}</h1></Card.Title>
                            <br />
                            <Card.Text style={{ width: "17rem" }}><h4>Location: {resAddress} | {resZIP} </h4></Card.Text>
                            <Card.Text style={{ width: "20rem" }}><h4>Contact: <Link>{restoEmail}</Link> | {resPhone}</h4></Card.Text>
                            <br />
                            <Card.Text style={{ width: "17rem" }}><h4>About us: {restoDescription}</h4></Card.Text>
                            <Card.Text style={{ width: "17rem" }}><h4>Timings: <br/> {resTiming}</h4></Card.Text>
                        </Card.Body>
                    </Row>
                </Card>
                <div className = "restoMenuDisplay">
                    {renderOutput}
                </div>
                <center>
                    <Button href="/home" className= "restoSearchButton">Home</Button>&nbsp;&nbsp;
                    <Button variant="success" name="goToCart" href="/cart" className= "restoSearchButton">Go To Cart</Button>
                </center>
                <br/>
            </div>
        )
    }
}

export default Restaurant;