const multer = require('multer');
const path = require('path');
const Menu = require("../../Models/MenuModel");
const MenuSection = require("../../Models/MenuSectionModel");
var kafka = require('../../kafka/client');

//Imported for jwt 
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/configValue");
const { auth } = require("../../config/passport");
const { checkAuth } = require("../../config/passport");
//auth();

//Upload restaurant profile picture
const menuitemstorage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..') + '/public/uploads/items',
    filename: (req, file, cb) => {
      cb(null, 'items' + req.params.id + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  
const menuuploads = multer({
    storage: menuitemstorage,
    limits: { fileSize: 1000000 },
  }).single("itemimage");
  
module.exports = {

    addMenu: (req, res) => {
        var menudetails = new Menu({
            item_name: req.body.item_name,
            item_description: req.body.item_description, 
            item_price: req.body.item_price,
            item_category: req.body.item_category,
            resto_id: req.body.resto_id
          });
      
        menudetails.save((error, data) => {
            if (error) {
                console.log('error', error);
                res.writeHead(500, {
                'Content-Type': 'text/plain'
                })
                res.end('Error in added menu');
            }
            else {
                console.log('data', data);
                res.writeHead(200, {
                'Content-Type': 'text/plain'
                })
                res.end('MENU_ADDED');
            }
        });
    },
    uploadMenuImage: (req, res, callBack) => {
        console.log("Inside update menu item image with data", req.params.id);

        menuuploads(req, res, function (err) {
            console.log("Inside update menu item image with data", req.params.id, req.file.filename);
            if (!err) {
                Restaurant.updateOne({ _id: req.params.id }, { res_image: req.file.filename }, { upsert: false }, (error, results) => {
                    if (error) {
                        console.log("Error uploading image", error);
                        callBack(error);
                    }
                    console.log("Result after uploading menu item image", results);
                    return callBack(null, results);
                });
            }
            else {
                console.log('Error Occured!');
            }
        })
    },
}
