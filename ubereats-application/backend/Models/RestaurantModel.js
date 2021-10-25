const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    resto_name: {type: String, required: true},
    email_id: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String},
    zipcode: {type: String},
    phone_number: {type: String},
    resto_description: {type: String},
    timings: {type: String},
    resto_img: {type: String},
    delivery: {type:String},
    favourite: {type:String},
},
{
    versionKey: false
});

const restaurantmodel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantmodel;