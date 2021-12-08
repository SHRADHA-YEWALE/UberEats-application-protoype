const router = require("express").Router();

console.log('Customer Signup Router');
const {
    customerSignUp,
} = require("../mutation/signUp");

router.post("/customer/", customerSignUp);

// const {
//     restaurantSignup,
// } = require("./signup.service");

// router.post("/restaurant/", restaurantSignup);

module.exports = router;