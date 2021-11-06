const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
    getCustomerProfileDetails,
    updateCustomerProfile,
    updateCustomerProfilePic

} = require("./customer.controller");

//let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.get("/getCustomerProfileDetails/:id", getCustomerProfileDetails);
 //router.get("/getStudentDetails/:id", getStudentDetails);
 //router.post("/updateStudentProfilePic/:id", checkAuth ,updateCustomerProfilePic);

 router.post("/updateCustomerProfilePic/:id", updateCustomerProfilePic);
 router.post("/updateCustomerProfile", updateCustomerProfile);

module.exports = router;