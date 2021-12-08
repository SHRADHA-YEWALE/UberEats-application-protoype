const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String},
    zipcode: {type: String},
    phone_number: {type: String},
    resto_description: {type: String},
    timings: {type: String},
    res_image: {type: String},
    delivery: {type:String},
    favourite: {type:String},
},
{
    versionKey: false
});

const restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurant;