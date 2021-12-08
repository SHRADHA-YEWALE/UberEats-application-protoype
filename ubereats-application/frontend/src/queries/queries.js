import { gql } from 'apollo-boost';

const customerLoginFetchQuery = gql`
query($email: String,$password: String) {
  login(email:$email,password:$password){
    _id
    name
    email
    country
  }
}
`;

const restaurantLoginFetchQuery = gql`
query($email: String,$password: String) {
  login(email:$email,password:$password){
    _id
    name
    email
    location
  }
}
`;

const restaurantDataFetchQuery = gql`
query($id: String) {
  fetchRestaurantData(id: $id) {
      name,
      description,
      email,
      location,
      phonenumber,
      timings,
      res_image
  }
}`;

const orderDetailsFetchQuery = gql`
query($id: String) {
  fetchRestaurantData(id: $id) {
      resto_name,
      cust_name,
      email,
      location,
      phonenumber,
      zipocde,
      order_status,
      sub_total,
      tax,
      delivery,
      total_price
  }
}`;

export {
    customerLoginFetchQuery,
    restaurantLoginFetchQuery,
    restaurantDataFetchQuery,
    orderDetailsFetchQuery
  };
  