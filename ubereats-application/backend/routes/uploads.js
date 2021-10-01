const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../sqlpool.js');
const { response } = require("express");

const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
        cb(null, 'restaurant' + req.params.user_id + "-" + Date.now() + path.extname(file.originalname));
    }
});

const resuploads = multer({
    storage: resstorage,
    limits: { fileSize: 1000000 },
}).single("resimage");

router.post("/restaurant/:user_id", (req, res) => {
    console.log("Backend ->Inside resto image upload with resto id", req.params.user_id);
    resuploads(req, res, function (err) {
        if (!err) {
            let imageSql = `UPDATE uber_eats.restaurant SET res_image = '${req.file.filename}' WHERE resto_id = ${req.params.user_id}`;
            pool.query(imageSql, (err, result) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end("Database Error");
                }
               
            });
            
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            console.log("file name from req", req.file.filename);
            res.end(req.file.filename);
        }
        else {
            console.log('Error!');
        }
    })
});

const itemstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/items',
    filename: (req, file, cb) => {
        cb(null, "item-" + Date.now() + path.extname(file.originalname));
    }
});

const itemuploads = multer({
    storage: itemstorage,
    limits: { fileSize: 1000000 },
}).single("itemimage");

router.post("/item/:item_id", (req, res) => {
    itemuploads(req, res, function (err) {
        console.log("Uploading the image in the DB");
        if (!err) {
            if (req.params.item_id !== "undefined") {
                console.log("Uploading the image in the DB");
                let imageSql = `UPDATE uber_eats.menu_items SET item_image = '${req.file.filename}' WHERE item_id = ${req.params.item_id}`;

                pool.query(imageSql, (err, result) => {
                    if (err) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.end("Database Error");
                    }
                    console.log("Menu item image uploaded successfully!");
                });
            }
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log(err);
        }
    })
});

module.exports = router;