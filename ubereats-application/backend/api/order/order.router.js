const router = require("express").Router();
const passport = require('passport');

console.log('Cart Router');
const {
    placeorder,
    pendingorders,
    getOrderByOrderId,
    getOrderByRestId,
    getOrderByOrderStatus,
    cancelOrder,
    updateOrderStatus
} = require("./order.controller");

const { checkAuth } = require("../../config/passport");

router.post("/placeorder", checkAuth, placeorder);
router.get("/pendingorder/:user_id", checkAuth, pendingorders);
router.post("/orderByStatus", checkAuth, getOrderByOrderStatus);
router.get("/orderitems/:id", checkAuth, getOrderByOrderId);
router.get("/restaurant/orderitems/:id", checkAuth, getOrderByRestId);
router.post("/cancelorder", checkAuth, cancelOrder);
router.post("/updateStatus", checkAuth, updateOrderStatus);
module.exports = router;