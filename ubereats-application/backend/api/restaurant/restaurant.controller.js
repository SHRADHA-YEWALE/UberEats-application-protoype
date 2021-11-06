const {

    getRestaurantProfileDetails,
    updateRestaurantProfile,
    updateRestaurantProfilePic
 } = require("./restaurant.service");
  
  //const jwt = require('jsonwebtoken');
  //const { secret } = require('../../config/configValues');
  //var kafka = require('../../kafka/client');
  
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  //const { sign } = require("jsonwebtoken");
  

  
  
  module.exports = {
      
    getRestaurantProfileDetails: (req, res) => {
      const id = req.params.id;
      const data = {
        id: id,
        path: 'get_student_details'
      }
      // kafka.make_request('student',data,(err, results) => {
      //     if (err) {
      //       console.log(err);
      //       return;
      //     }
      //       return res.json({
      //       success: 1,
      //       data: results
      //       });
      //   });
      getRestaurantProfileDetails(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
  
  
    updateRestaurantProfile: (req, res) => {
      const body = req.body;
      console.log("Update restaurant form data", body);
      updateRestaurantProfile(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
  
  
    updateRestaurantProfilePic: (req, res) => {
      console.log("Inside updateRestaurantProfilePic controller", req.params.id);
      updateRestaurantProfilePic(req, res, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: req.file.filename
        });
      });
    }
}