const router = require("express").Router();
const multer = require('multer');


const {
    getRestaurantProfileDetails,
    updateRestaurantProfile,
    updateRestaurantProfilePic,
    restaurantSearch,
    restaurantDeliverySearch
} = require("./restaurant.controller");

router.get("/getRestaurantProfileDetails/:id", getRestaurantProfileDetails);
router.post("/updateRestaurantProfilePic", multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('image'), updateRestaurantProfilePic);
router.post("/updateRestaurantProfile", updateRestaurantProfile);
router.get("/restaurantsearch/:search_input", restaurantSearch);
router.post("/restaurantDeliverySearch/", restaurantDeliverySearch);

module.exports = router;