const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../sqlpool.js');

router.post('/customer', (req, res) => {
    var hashedPassword = passwordHash.generate(req.body.password);
    let sql = "INSERT INTO uber_eats.customer (cust_name, email_id, pwd) VALUES (?,?,?)"
  
    pool.query(sql, [req.body.name, req.body.email_id, hashedPassword],(err, result) => {
      console.log("result from db", result);
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.affectedRows > 0 ) {
        console.log("user added");
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end('USER_ADDED');
      }
      else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
        console.log("user exists");
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end(result[0][0].status)
      }
    });
  });

  router.post('/restaurant', (req, res) => {
    var hashedPassword = passwordHash.generate(req.body.password);
    let sql = "INSERT INTO uber_eats.restaurant (resto_name, email_id, pwd, location) VALUES (?,?,?,?)"
  
    pool.query(sql, [req.body.name, req.body.email_id, hashedPassword, req.body.location],(err, result) => {
      console.log("result from db", result);
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.affectedRows > 0 ) {
        console.log("user added");
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end('USER_ADDED');
      }
      else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
        console.log("user exists");
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end(result[0][0].status)
      }
    });
  });

  module.exports = router;