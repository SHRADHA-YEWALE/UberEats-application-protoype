const router = require("express").Router();
const passport = require('passport');
const multer = require('multer');


const {
    getRestaurantProfileDetails,
    updateRestaurantProfile,
    updateRestaurantProfilePic,
    restaurantSearch,
    restaurantDeliverySearch
} = require("./restaurant.controller");


const { checkAuth } = require("../../config/passport");
router.get("/getRestaurantProfileDetails/:id", checkAuth, getRestaurantProfileDetails);
router.post("/updateRestaurantProfilePic", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('image'), updateRestaurantProfilePic);
router.post("/updateRestaurantProfile", checkAuth, updateRestaurantProfile);
router.get("/restaurantsearch/:search_input", restaurantSearch);
router.post("/restaurantDeliverySearch/", checkAuth, restaurantDeliverySearch);

module.exports = router;