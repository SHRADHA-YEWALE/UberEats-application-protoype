const Restaurant = require("./Models/RestaurantModel");


exports.fetchRestaurantData = async args => {
    return new Promise(async (resolve, reject) => {
        Restaurant.find({_id: args}, (error, user) => {
        if (error) {
          resolve({ status: 500 });
        } else if (user) {
          resolve(user);
        }
      });
    });
  };