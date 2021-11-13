const router = require("express").Router();
const passport = require('passport');

console.log('Cart Router');
const {
    placeorder,
    pendingorders,
    getOrderByOrderId,
    getOrderByRestId,
    cancelOrder,
    updateOrderStatus
} = require("./order.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
router.post("/placeorder", placeorder);
router.get("/pendingorder/:user_id", pendingorders);
router.get("/orderitems/:id", getOrderByOrderId);
router.get("/restaurant/orderitems/:id", getOrderByRestId);
router.post("/cancelorder", cancelOrder);
router.post("/updateStatus", updateOrderStatus);
module.exports = router;