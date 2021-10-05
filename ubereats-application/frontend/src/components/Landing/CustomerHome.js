import React, { Component } from 'react';
import axios from 'axios';
import endPointObj from '../../endPointUrl.js';
import RestaurantCard from "./RestaurantCard";
import { InputGroup, FormControl, Button, DropdownButton, Dropdown, Alert, Col, Row, FormLabel } from 'react-bootstrap';
import NavigationBar from '../Navbar/CustomerNavbarHome.js';
import {Redirect} from 'react-router';
import './Landing.css';

class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_input: "",
            noRecord: false
        });

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onCuisineSelect = this.onCuisineSelect.bind(this);
    }

    componentDidMount() {
        axios.get(endPointObj.url + "/restaurant/restaurantsearch/_")
            .then(response => {
                var cuisines = [];
                if (response.data) {
                    console.log("resto data", response.data);
                    if (response.data[0].search_result === 'NO_RECORD') {
                        this.setState({
                            noRecord: true,
                            search_input: ""
                        });
                    }
                    else {
                        for (var i = 0; i < response.data.length; i++) {
                            if(!cuisines.includes(response.data[i].res_cuisine))
                            cuisines.push(response.data[i].res_cuisine)
                        }
                        this.setState({
                            restaurantList: response.data,
                            displayRestaurants: response.data,
                            cuisineList: cuisines
                        });
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log(error.response.data);
                }
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    onSearch = (e) => {
        e.preventDefault();
        
        if (this.state) {
            var searchInput = typeof this.state.search_input === "undefined" || this.state.search_input === "" ? "_" : this.state.search_input;
            let data = {
                searchInput : searchInput,
                delivery : this.state.delivery
            }
            axios.post(endPointObj.url + "/restaurant/restaurantDeliverySearch", data)
                .then(response => {
                    var cuisines = [];
                    if (response.data) {
                        if (response.data === 'NO_RECORD') {
                            this.setState({
                                noRecord: true,
                                search_input: searchInput
                            });
                        }
                        else {
                            for (var i = 0; i < response.data.length; i++) {
                                if(!cuisines.includes(response.data[i].res_cuisine))
                                cuisines.push(response.data[i].res_cuisine)
                            }
                            this.setState({
                                restaurantList: response.data,
                                displayRestaurants: response.data,
                                cuisineList: cuisines,
                                noRecord: false
                            });
                        }
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                    }
                })
        }
    }

    onCuisineSelect = (e) => {
        var filteredList = this.state.restaurantList.filter(restaurant => restaurant.res_cuisine === e.target.text);
        this.setState({
            displayRestaurants: filteredList
        });
    }

    render() {
        var cuisineDropdown = null,
            restaurantCards = null,
            noRecordMessage = null;
        let redirectVar = null;  

        if(!localStorage.getItem("user_id")) {
            alert("BYE");
            redirectVar = <Redirect to= "/customerLogin"/>
        }
        if (this.state && this.state.cuisineList) {
            cuisineDropdown = this.state.cuisineList.map(cuisine => {
                return (
                    <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
                )
            })
        }

        if (this.state && this.state.displayRestaurants) {
            restaurantCards = this.state.displayRestaurants.map(restaurant => {
                return (
                    <Col md={6}>
                        <RestaurantCard restaurant={restaurant} />
                    </Col>
                );
            });
        }

        if (this.state && this.state.noRecord && this.state.search_input === "") {
            noRecordMessage = (
                <Alert variant="warning">
                    No Restaurants are available now. Please try again later.
                </Alert>
            );
        }
        else if(this.state && this.state.noRecord){
            noRecordMessage = (
            <Alert variant="warning">
                    No Results. Please try again.
                </Alert>
            );
        }
        else {
            noRecordMessage = null;
        }

        return (
            <div>
                {redirectVar}
                <div> <NavigationBar /> </div>
                <center><br /><br />
                    
                    <br />
                    <table>
                    <tr>  
                    <td>
                    <div className="custHomeRestoSearch"><br/><br/> 
                    <h4>Search for the Restaurants for delicious food.</h4><br/><br/>
                    <form onSubmit={this.onSearch}>
                        <InputGroup style={{ width: '90%', height: '100%', paddingTop: '0em'}} size="lg">
                            <FormControl
                                style={{ width: '90%', height: '100%'}}
                                placeholder="Search Food, Restaurant, location"
                                aria-label="Search Restaurants"
                                aria-describedby="basic-addon2"
                                name="search_input"
                                className = "searchInputField"
                                onChange={this.onChange}
                            /> <br /><br /><br/><br/>
                             <FormLabel><h4>Mode of delivery:</h4></FormLabel>
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <input type="radio" id="pickup" name="pickup" value="P" />
                             <FormLabel for="pickup"><h5>Pickup</h5></FormLabel>
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <input type="radio" id="delivery" name="delivery" value="D"  />
                             <FormLabel for="pickup"><h5>Delivery</h5></FormLabel>
                             <br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <center><Button variant="primary" type="submit" className="restoSearchButton"><h5><b>Search</b></h5></Button></center>
                          
                            
                        </InputGroup> 
                    </form>
                    </div>
                    </td>
                    <td>
                    <div className="welcomeTitle">
                    <h1>Welcome to UberEats</h1>
                    </div>
                    <br /><br />
                    {noRecordMessage}
                    <Row md="6">{restaurantCards}</Row>
                    </td></tr> </table>
                </center>
            </div>
        )
    }
}

export default CustomerHome;
