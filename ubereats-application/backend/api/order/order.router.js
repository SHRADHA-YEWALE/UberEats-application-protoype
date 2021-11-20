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
router.get("/orderitems/:id", getOrderByOrderId);
router.get("/restaurant/orderitems/:id", getOrderByRestId);
router.post("/cancelorder", cancelOrder);
router.post("/updateStatus", updateOrderStatus);
module.exports = router;