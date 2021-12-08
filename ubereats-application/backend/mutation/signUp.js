const Users = require("../Models/CustomerModel");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
//const { secret } = require("../../Backend/Utils/config");

const customerSignUp = async args => {
  return new Promise(async (resolve, reject) => {
    //const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    //args.password = await bcrypt.hash(args.password, salt);
    console.log("Registering New User");
    const newUser = {
        cust_name: args.name,
        email_id: args.email,
        password: args.password,
        //dob: args.dob,
        country: args.country
    };
    new Users(newUser).save((error, data) => {
      if (error) {
        console.log("Error while registering user", error);  
        resolve({ status: 500, message: "User is already registered" });
      } else {
        console.log("Registration successfull!");  
        newUser._id = data._id;
        newUser.cust_name = data.cust_name;
        newUser.email_id = data.email_id;
        newUser.password = "";
        newUser.status = 200;
        newUser.message = "Registration Successfully";
        console.log(newUser);
        resolve(newUser);
      }
    });
  });
};

exports.customerSignUp = customerSignUp;
