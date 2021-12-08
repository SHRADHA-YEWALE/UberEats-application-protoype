const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var menuItemSchema = new Schema({
    _id: {type: Schema.ObjectId, auto: true },
    itemname: {type: String, required: true},
    itemdescription: {type: String, required: true},
    itemprice: {type: Number},
    itemimage: {type: String},
    itemcategory: {type: String},
    restoid: {type: String}
},
{
    versionKey: false
});

const menumodel = mongoose.model('menu_item', menuItemSchema);
module.exports = menumodel;