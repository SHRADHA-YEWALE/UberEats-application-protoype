//import express module 
var express = require('express');
//create  an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
//require cookie parser
var cookieParser = require('cookie-parser');
//import cors
const cors = require('cors');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://52.15.78.233:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://52.15.78.233:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//use express session to maintain session data
app.use(session({
  secret              : 'cmpe273_kafka_passport_mongo',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000
}));

app.use(express.static('./public'));


const signup = require("./routes/signup");
app.use("/signup", signup);

const login = require("./routes/login");
app.use("/login", login);

const profile = require("./routes/profile");
app.use("/profile", profile);

const upload = require("./routes/uploads");
app.use("/uploads", upload);

const images = require("./routes/images");
app.use("/images", images);

const menuitems = require("./routes/menuitems");
app.use("/menu", menuitems);

const menusections = require("./routes/menusections");
app.use("/menu", menusections); 

const restaurant = require("./routes/restaurant");
app.use("/restaurant", restaurant); 

const cart = require("./routes/cart");
app.use("/cart", cart); 

const orders = require("./routes/orders");
app.use("/orders", orders);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;