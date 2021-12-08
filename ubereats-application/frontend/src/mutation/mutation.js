import { gql } from "apollo-boost";
const customerSignUpMutation = gql`
mutation customerSignUp($name: String, $email: String, $password: String, $country: String) {
    customerSignUp(name: $name, email: $email, password: $password, country: $country) {
      name
      email
      password
      status
      message
    }
  }
`;

const restaurantSignUpMutation = gql`
mutation restaurantSignup($name: String, $email: String, $password: String, $location: String) {
  restaurantSignup(name: $name, email: $email, password: $password, location: $location) {
      _id
      name
      email
      password
      location
    }
  }
`;

const addMenuMutation = gql`
mutation addMenu($restoid: String, $itemname: String, $itemdescription: String, $itemprice: String, $itemcategory: String, $itemimage: String) {
  addMenu(restoid: $restoid, itemname: $itemname, itemdescription: $itemdescription, itemprice: $itemprice, itemcategory: $itemcategory, itemimage: $itemimage) {
      _id
      restoid
      itemname
      itemdescription
      itemprice
      itemcategory
      itemimage
    }
  }`;

const placeOrderMutation = gql`
mutation placeOrder($userid: String, $address: String, $custname: String, $restoid: String, $restoname: String, $orderstatus: String,$tax: String,$delivery: String,$totalprice: String) {
  placeOrder(userid: $userid, address: $address, custname: $custname, restoid: $restoid, restoname: $restoname, orderstatus: $orderstatus,tax:$tax, delivery:$delivery, totalprice:$totalprice) {
      userid
      address
      custname
      restoid
      restoname
      orderstatus
      tax
      delivery
      totalprice
    }
  }`;

export {
    customerSignUpMutation,
    restaurantSignUpMutation,
    addMenuMutation,
    placeOrderMutation
  };