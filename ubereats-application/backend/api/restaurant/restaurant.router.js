const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
    getRestaurantProfileDetails,
    updateRestaurantProfile,
    updateRestaurantProfilePic

} = require("./restaurant.controller");

//let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.get("/getRestaurantProfileDetails/:id", getRestaurantProfileDetails);
 //router.get("/getStudentDetails/:id", getStudentDetails);
 //router.post("/updateStudentProfilePic/:id", checkAuth ,updateCustomerProfilePic);

 router.post("/updateRestaurantProfilePic/:id", updateRestaurantProfilePic);
 router.post("/updateRestaurantProfile", updateRestaurantProfile);

module.exports = router;