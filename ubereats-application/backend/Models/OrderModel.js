const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    cust_id: {type: String },
    item_id: {type: String},
    resto_id: {type: String},
    item_quantity: {type: String},
    order_status: {type: String},
    sub_total: {type: Number},
    tax: {type: Number},
    delivery: {type: Number},
    total_price: {type: Number},
    order_date: {type: Date},
},
{
    versionKey: false
});

const ordermodel = mongoose.model('order', orderSchema);
module.exports = ordermodel;