const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
    getRestaurantProfileDetails,
    updateRestaurantProfile,
    updateRestaurantProfilePic,
    restaurantSearch,
    restaurantDeliverySearch
} = require("./restaurant.controller");

//let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.get("/getRestaurantProfileDetails/:id", getRestaurantProfileDetails);
 router.post("/updateRestaurantProfilePic/:id", updateRestaurantProfilePic);
 router.post("/updateRestaurantProfile", updateRestaurantProfile);
 router.get("/restaurantsearch/:search_input", restaurantSearch);
 router.post("/restaurantDeliverySearch/", restaurantDeliverySearch);

module.exports = router;