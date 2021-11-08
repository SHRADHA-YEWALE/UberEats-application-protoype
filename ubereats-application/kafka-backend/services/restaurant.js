
const Restaurant = require('../Models/RestaurantModel');

function handle_request(msg, callBack) {
    console.log("Inside restaurant handle request");
    if (msg.path == 'get-restaurant-details') {
        console.log("Inside restaurant handle request : get-restaurant-details");
        const data = msg.data
        console.log("Data from the request", data);
        Restaurant.findOne({ _id: data }, (error, result) => {
            if (error) {
                console.log("Error while fetching restaurant details", error);
                callBack(error);
            }
            console.log("Fetching restaurant details result", result);
            return callBack(null, result);
        })
    }
};

exports.handle_request = handle_request;