import React, { Component } from "react";
import { Card, Modal, Button, Col, Row } from "react-bootstrap";
import endPointObj from '../../endPointUrl.js';
import '../Landing/Landing.css';
import './Restaurant.css'

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.setState({
      showModal: false,
      item_quantity: 1
    });

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  onClose = (e) => {
    this.setState({
      showModal: false
    });
  }

  onQuantityChange = (e) => {
    let quantity = parseInt(e.target.value);
    this.setState({
      item_quantity: quantity
    });
  };

  addToCart = (e) => {
    let item_id = this.props.menu_item.item_id;
    let cartItems = [];

    if (parseInt(localStorage.getItem("cart_res_id")) !== this.props.menu_item.res_id) {
      localStorage.setItem("cart_items", cartItems);
    }

    if (localStorage.getItem("cart_items")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
    }

    let index = cartItems.findIndex((cartItem => cartItem.item_id === item_id));
    if (index === -1) {
      cartItems.push({ item_id: item_id, item_quantity: this.state.item_quantity || 1, item_price: this.props.menu_item.item_price, 
        item_name: this.props.menu_item.item_name, item_description: this.props.menu_item.item_description });
      localStorage.setItem("cart_res_id", this.props.menu_item.res_id);
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
      this.setState({
        showModal: false,
        item_quantity: 1
      });
    }
  };

  removeFromCart = (e) => {
    let item_id = this.props.menu_item.item_id;
    let cartItems = [];

    if (localStorage.getItem("cart_items")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
    }

    let index = cartItems.findIndex((cartItem => cartItem.item_id === item_id));
    if(index !== -1){
      e.target.textContent = "Add to Cart";
      e.target.className = "btn btn-primary";
      cartItems.splice(index, 1);
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
      this.setState({
        item_quantity: null
      });
    }
  };


  render() {
    let imageSrc = endPointObj.url + "/images/item/" + this.props.menu_item.item_image;
    let buttonText = "Add to Cart";
    let buttonVariant = "primary";
    let cartItems = [];
    let cartItemIds = [];
    let showModal = false;
    let buttonClick = this.openModal;
    if (localStorage.getItem("cart_items")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
      cartItemIds = cartItems.map(cartItem => cartItem.item_id);
      buttonText = cartItemIds.includes(this.props.menu_item.item_id) ? "Remove from Cart" : buttonText;
      buttonVariant = cartItemIds.includes(this.props.menu_item.item_id) ? "warning" : buttonVariant;
      buttonClick = cartItemIds.includes(this.props.menu_item.item_id) ? this.removeFromCart : this.openModal;
    }
    if(this.state){
      showModal = this.state.showModal;
    }

    return (
      <div>
        <Card bg="white" style={{ width: "50rem", margin: "2%" }} border="1">
          <Row>
            <Col>
              <Card.Img style={{ width: "12rem", height: "9rem" }} alt="" src={imageSrc} />
            </Col>
            <Col>
            <Card.Body>
              <Card.Title style={{ width: "20rem", fontSize: "1em"}}>{this.props.menu_item.item_name}</Card.Title>
              <Card.Text style={{ width: "10rem" }}style={{ width: "20rem" }}>{this.props.menu_item.item_description}</Card.Text>
              <Card.Text>Price: $ {this.props.menu_item.item_price}</Card.Text>
            </Card.Body>
            </Col>
            <Col align="left">
              <br />
              <Button variant={buttonVariant} onClick={buttonClick} name={this.props.menu_item.item_id} className="restoSearchButton">{buttonText}</Button>&nbsp; &nbsp;
            </Col>
          </Row>
        </Card>
        <br/>
        <div id="myModal" className="Modal is-hidden">
          <Modal show={showModal} onHide={this.onClose} className="Modal-content">
            <Modal.Header>
              <Modal.Title className="itemCartTitle">{this.props.menu_item.item_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <center>
                <img src={imageSrc} width="50%"  alt="" />
                <p>{this.props.menu_item.item_description}</p>
                Quantity: <input type="number" name={this.props.menu_item.item_id} min="1" max="10" width="10%" onChange={this.onQuantityChange} defaultValue="1" autofocus></input>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="Close" onClick={this.onClose}>
                Close
              </Button>
              <Button className="addToCartButton" onClick={this.addToCart}>
                Add to Cart
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ItemCard;