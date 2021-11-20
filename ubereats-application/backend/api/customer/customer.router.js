const router = require("express").Router();
const multer = require('multer');

const {
    getCustomerProfileDetails,
    updateCustomerProfile,
    updateCustomerProfilePic

} = require("./customer.controller");

const { checkAuth } = require("../../config/passport");
router.get("/getCustomerProfileDetails/:id", checkAuth, getCustomerProfileDetails);
router.post("/updateCustomerProfilePic", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('image'), updateCustomerProfilePic);
router.post("/updateCustomerProfile", checkAuth, updateCustomerProfile);

module.exports = router;