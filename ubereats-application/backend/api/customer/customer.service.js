const Customer = require("../../Models/CustomerModel");
const multer = require('multer');
const path = require('path');



//Upload restaurant profile picture
const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..') + '/public/uploads/users',
    filename: (req, file, cb) => {
      cb(null, 'restaurant' + req.params.id + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  
  const resuploads = multer({
    storage: resstorage,
    limits: { fileSize: 1000000 },
  }).single("resimage");

module.exports = {
  
    getCustomerProfileDetails: (id, callBack) => {
        console.log("Inside get customer details service");
        Customer.findOne({ _id: id }, (error, result) => {
        if (error) {
            callBack(error);
        }
        console.log("Customer Details:",result);
        return callBack(null, result);
        });
    },

    updateCustomerProfile: (data, callBack) => {
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
        Customer.updateOne({ _id: data.user_id }, newData, { upsert: false }, (error, results) => {
        if (error) {
            console.log("Error while updating restaurant details", error);
            callBack(error);
        }
        console.log("Result after updating restaurant details", results);
        return callBack(null, results);
        });
    },
  
    updateCustomerProfilePic: (req, res, callBack) => {
        console.log("Inside update restaurant profile picture with data", req.params.id);
        // Customer.updateOne({ _id: data.id }, { profilePicURL: data.profilePicURL }, { upsert: false }, (error, results) => {
        //     if (error) {
        //         callBack(error);
        //     }
        //     return callBack(null, results);
        // });

        resuploads(req, res, function (err) {
            console.log("Inside update restaurant profile picture with data", req.params.id, req.file.filename);
            if (!err) {
                Customer.updateOne({ _id: req.params.id }, { res_image: req.file.filename }, { upsert: false }, (error, results) => {
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
