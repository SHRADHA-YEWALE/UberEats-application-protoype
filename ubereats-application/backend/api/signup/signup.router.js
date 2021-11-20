const router = require("express").Router();

console.log('Signup Router');
const {
    customersignup,
} = require("./signup.service");

router.post("/customer/", customersignup);

const {
    restaurantSignup,
} = require("./signup.service");

router.post("/restaurant/", restaurantSignup);

module.exports = router;