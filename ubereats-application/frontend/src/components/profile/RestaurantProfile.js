import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant, updateRestaurant } from '../../actions/restaurantProfileActions'
import { Link } from "react-router-dom";
import './RestoProfile.css';
import NavigationBar from '../Navbar/RestaurantNavbarHome.js';
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import endPointObj from '../../endPointUrl.js';


class RestaurantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onResImageChange = this.onResImageChange.bind(this);
    }

    componentWillMount() {
        this.props.getRestaurant();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            var { user } = nextProps;

            var userData = {
                user_id: user.user_id || this.state.user_id,
                name: user.name || this.state.name,
                description: user.description || this.state.description,
                email_id: user.email_id || this.state.email_id,
                address: user.address || this.state.address,
                phone_number: user.phone_number || this.state.phone_number,
                timings : user.timings || this.state.timings,
                res_image: user.res_image || this.state.res_image
            };
            console.log("Restaurant name"+userData.name);
            console.log("Restaurant address"+userData.address);
            console.log("Restaurant phone"+userData.phone_number);
            this.setState(userData);
        }
    }

    onResImageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0],
            resFileText: e.target.files[0].name
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onUpdate = (e) => {
        console.log("Updating the customer details - frontend");
        //prevent page from refresh
        e.preventDefault();

        let data = Object.assign({}, this.state);
        this.props.updateRestaurant(data);
    };

    onResUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("resimage", this.state.res_file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        axios.post(endPointObj.url + '/uploads/restaurant/' + this.state.user_id, formData, uploadConfig)
            .then(response => {
                console.log("image response", response.data);
                alert("Image uploaded successfully!");
                this.setState({
                    resFileText: "Choose file...",
                    res_image: response.data
                });
            })
            .catch(err => {
                console.log("Error");
            });
    }

    render() {
        var resImageSrc, res_title, title,
        resFileText = this.state.resFileText || "Choose image..";

        if (this.state) {
            resImageSrc = endPointObj.url + '/images/restaurant/' + this.state.res_image;
            res_title = this.state.name;
        }

        return (
            <div className= "profileBackGroundLayer">
                    <div> <NavigationBar /> </div>
                    
                    <div className="restaurantProfileContainer"> 

                    <center>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img style={{ width: '2em' }} variant="top" src={resImageSrc} />
                                        <Card.Body>
                                            <Card.Title><h3>{res_title}</h3></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <form onSubmit={this.onResUpload}>
                                        <div class="custom-file" style={{ width: "80%" }}>
                                            <input type="file" class="custom-file-input" name="res_file" accept="image/*" onChange={this.onResImageChange} required/>
                                            <label class="custom-file-label" for="user-file">{resFileText}</label>
                                        </div><br/>
                                        <Button type="submit" variant="primary" className="submit-resto-btn-primary">Upload</Button>
                                    </form>
                                </center>
                  
                        <div className="profileLabel"><b><u>Restaurant Profile Update</u></b></div><br/>
                      
                
                        <Form onSubmit={this.onUpdate} >
                           
                                <Form.Group as={Row} className="mb-3"  controlId="name">
                                    <Form.Label column sm="3" className="inputLabel"> Restaurant Name</Form.Label>
                                    <Col sm="10">
                                        <Form.Control name="name"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.name}
                                            pattern="^[A-Za-z0-9 ]+$"
                                            required={true} />
                                    </Col> 
                                </Form.Group>
                          
                            <br/>

                                <Form.Group as={Row} className="mb-3" controlId="formGridCity">
                                        <Form.Label column sm="3" className="inputLabel">Description</Form.Label>
                                        <Col sm="10">
                                        <Form.Control type="text"
                                            name="description"
                                            onChange={this.onChange}
                                            value={this.state.description}
                                            pattern="^[A-Za-z0-9 ,-]+$"
                                            required={true} />
                                        </Col>    
                                    </Form.Group>
                           
                            <br/>
                         
                                <Form.Group as={Row} className="mb-3" controlId="email_id">
                                    <Form.Label column sm="3" className="inputLabel">Email</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="email"
                                        name="email_id"
                                        value={this.state.email_id}
                                        disabled />
                                    </Col>    
                                </Form.Group>
                        
                            <br/>
                          
                                <Form.Group as={Row} className="mb-3" controlId="RB.password">
                                    <Form.Label column sm="3" className="inputLabel">Password</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="password"
                                        name="password"
                                        onChange={this.onChange}
                                        placeholder="New Password" />
                                    </Col>    
                                </Form.Group>
                            
                            <br/>
                           
                                <Form.Group as={Row} className="mb-3" controlId="formGridCity">
                                    <Form.Label column sm="3" className="inputLabel">Address</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text"
                                        name="address"
                                        onChange={this.onChange}
                                        value={this.state.address}
                                        pattern="^[A-Za-z0-9 ,-]+$"
                                        required={true} />
                                    </Col>    
                                </Form.Group>
                           
                            <br/>
                            
                                <Form.Group as={Row} className="mb-3" controlId="formGridZip">
                                    <Form.Label column sm="3" className="inputLabel">Phone Number</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text"
                                        name="phone_number"
                                        onChange={this.onChange}
                                        value={this.state.phone_number}
                                        required={true}
                                        pattern="^[0-9]+$"
                                    />
                                    </Col>
                                </Form.Group>
                           
                            <br/>
                                <Form.Group as={Row} className="mb-3" controlId="formGridZip">
                                    <Form.Label column sm="3" className="inputLabel">Timings</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="textarea"
                                        name="timings"
                                        onChange={this.onChange}
                                        value={this.state.timings}
                                        rows = "30"
                                        cols = "40"
                                        required={true}
                                    />
                                    </Col>
                                </Form.Group>
                           
                            <br/>
                            <div class ="buttonDiv">
                            <ButtonGroup aria-label="Third group">
                                <Button type="submit" variant="success">Update Profile</Button>
                            </ButtonGroup>
                            
                            <ButtonGroup aria-label="Fourth group">
                                <Link to="/restaurantHome"><Button variant="secondary">Cancel</Button></Link>
                            </ButtonGroup>
                            </div>
                        </Form>
                      
                       
                    </div><br/><br/><br/> 
               
            </div>
        )
    }
}

RestaurantProfile.propTypes = {
    getRestaurant: PropTypes.func.isRequired,
    updateRestaurant: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.restaurantProfile.user
});

export default connect(mapStateToProps, { getRestaurant, updateRestaurant })(RestaurantProfile);