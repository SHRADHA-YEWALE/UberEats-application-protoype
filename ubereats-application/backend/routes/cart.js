const express = require("express");
const router = express.Router();
const pool = require('../sqlpool.js');

router.post('/item', (req, res) => {
    console.log("Inside add item to cart db call");
    let sql = "INSERT INTO uber_eats.cart (user_id, item_id, resto_id, item_quantity) VALUES (?,?,?,?)";
    pool.query(sql, [req.body.user_id, req.body.item_id, req.body.resto_id, req.body.item_quantity], (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        console.log("err", err);
        res.end("Database Error",err);
      }
      if (result && result.affectedRows > 0 ) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('ITEM_ADDED_TO_CART');
      }
    });
  });

  router.get('/item/:user_id', (req, res) => {
    console.log("Inside add item to cart db call");
    let sql = "select m.item_id, c.item_quantity, m.item_price, m.item_name, m.item_description, m.resto_id, c.user_id " 
    + " from uber_eats.cart c" 
    + " left outer join uber_eats.menu_items m on m.item_id = c.item_id "
    + " where c.user_id = ?";
    pool.query(sql, req.params.user_id, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        console.log("error",err);
        res.end("Database Error",err);
      }
      if (result && result.length > 0 ) {
        console.log("Data Successfully inserted:", result);
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(result));
      }
    });
  });

  router.post('/cartItemdelete', (req, res) => {
    let sql = "DELETE from uber_eats.cart where item_id = ? and user_id = ?";
    pool.query(sql, [req.body.item_id,req.body.user_id], (err, result) => {
      console.log("Result after deleteing item", result);
      if (err) {
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Database Error",err);
      }
      if (result && result.affectedRows > 0) {
        console.log("Item deleted successfully.");
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('ITEM_REMOVED');
      }
      else if (result && result.length > 0 && result[0][0].status === 'NO_RECORD') {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('NO_RECORD');
      }
    });
  });

  module.exports = router;