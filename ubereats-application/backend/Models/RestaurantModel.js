const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String},
    zipcode: {type: String},
    phonenumber: {type: String},
    description: {type: String},
    timings: {type: String},
    res_image: {type: String},
    delivery: {type:String},
    favourite: {type:String},
},
{
    versionKey: false
});

const restaurantmodel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantmodel;