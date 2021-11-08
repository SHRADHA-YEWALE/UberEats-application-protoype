const Restaurant = require("../../Models/RestaurantModel");
const multer = require('multer');
const path = require('path');
var kafka = require('../../kafka/client');

//Upload restaurant profile picture
const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
      cb(null, 'restaurant' + req.params.id + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  
  const resuploads = multer({
    storage: resstorage,
    limits: { fileSize: 1000000 },
  }).single("resimage");

module.exports = {
  
    getRestaurantProfileDetails: (id, callBack) => {
        console.log("Inside get restaurant details service");
        // Restaurant.findOne({ _id: id }, (error, result) => {
        // if (error) {
        //     callBack(error);
        // }
        // console.log("Restaurant Details:",result);
        // return callBack(null, result);
        // });
        const params = {
            data: id,
            path: 'get-restaurant-details'
        }

        kafka.make_request('restaurant', params, (error, result) => {
            if (error) {
                console.log(error);
                callBack(error);
            }
            console.log("Restaurant details", result);
            return callBack(null, result);
        });
    },

    updateRestaurantProfile: (data, callBack) => {
        console.log("Inside update restaurant profile service", data.user_id);
        var newData = {
            resto_name: data.resto_name,
            resto_description: data.resto_description,
            password: data.pwd,
            address: data.address,
            zipcode: data.zipcode,
            phone_number: data.phone_number,
            timings: data.timings,
            delivery: data.delivery,
            favourite: data.favourite,
            country: data.country,
            dob: data.dob,
            email_id: data.email_id
        }
        Restaurant.updateOne({ _id: data.user_id }, newData, { upsert: false }, (error, results) => {
        if (error) {
            console.log("Error while updating restaurant details", error);
            callBack(error);
        }
        console.log("Result after updating restaurant details", results);
        return callBack(null, results);
        });
    },
  
    updateRestaurantProfilePic: (req, res, callBack) => {
        console.log("Inside update restaurant profile picture with data", req.params.id);
        // Restaurant.updateOne({ _id: data.id }, { profilePicURL: data.profilePicURL }, { upsert: false }, (error, results) => {
        //     if (error) {
        //         callBack(error);
        //     }
        //     return callBack(null, results);
        // });

        resuploads(req, res, function (err) {
            console.log("Inside update restaurant profile picture with data", req.params.id, req.file.filename);
            if (!err) {
                Restaurant.updateOne({ _id: req.params.id }, { res_image: req.file.filename }, { upsert: false }, (error, results) => {
                    if (error) {
                        console.log("Error uploading image", error);
                        callBack(error);
                    }
                    console.log("Result after uploading restaurant photo", results);
                    return callBack(null, results);
                });
            }
            else {
                console.log('Error Occured!');
            }
        })
    }
}
