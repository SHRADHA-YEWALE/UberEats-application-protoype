const Customer = require("../../Models/CustomerModel");
const Restaurant = require("../../Models/RestaurantModel");
//Imported for jwt 
//const jwt = require('jsonwebtoken');
//const { secret } = require("../../config/configValues");
//const { auth } = require("../../config/passport");
//const { checkAuth } = require("../../config/passport");

module.exports = {

    customerLogin: (req, res) => {
        //auth();
        Customer.findOne({ email_id: req.body.email_id, password: req.body.password }, (error, result) => {
        console.log("inside customer login")
        if (error) {
            console.log(error);
        } else {
            if (result && result != null) {
                res.cookie("cookie", "admin", {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                });
                res.cookie("user_id", req.body._id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                });

                const payload = { _id: result._id };
                //const token = jwt.sign(payload, secret, {
                //    expiresIn: 1008000
                //});
                //result.token = token;
                console.log(result);
                return res.send(result);
            } else {
                res.writeHead(401, {
                    'Content-Type': 'text/plain'
                })
                console.log('invalid');
                res.end("Invalid Credentials");
            }
        }

        });
    },

    restaurantLogin: (req, res) => {
        //auth();
        Restaurant.findOne({ email_id: req.body.email_id, password: req.body.password }, (error, result) => {
        console.log("inside customer login")
        if (error) {
            console.log(error);
        } else {
            if (result && result != null) {
            res.cookie("cookie", "admin", {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
            });
            res.cookie("userId", req.body._id, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
            });

            const payload = { _id: result._id };
            //const token = jwt.sign(payload, secret, {
            //    expiresIn: 1008000
            //});
            //result.token = token;
            //console.log(result);
            return res.send(result);
            } else {
            res.writeHead(401, {
                'Content-Type': 'text/plain'
            })
            console.log('invalid');
            res.end("Invalid Credentials");
            }
        }

        });
    }
}
