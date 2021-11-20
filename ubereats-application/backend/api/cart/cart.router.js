const router = require("express").Router();
const passport = require('passport');

console.log('Cart Router');
const {
    addItemToCart,
    deleteItemCart,
    getCartItems
} = require("./cart.controller");

const { checkAuth } = require("../../config/passport");

router.post("/addItem", checkAuth, addItemToCart);
router.post("/cartItemDelete", checkAuth, deleteItemCart);
router.get("/getcartitems/:userid", checkAuth, getCartItems);

module.exports = router;