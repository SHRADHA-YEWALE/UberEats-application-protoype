const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../sqlpool.js');

router.post('/', (req, res) => {
    let sql = "SELECT * FROM uber_eats.customer WHERE email_id = ?";

    pool.query(sql, req.body.email_id, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.send("Database Error");
      }
      if (result && result.length > 0) {
        if (passwordHash.verify(req.body.password, result[0].pwd)) {
          res.cookie('cookie', "admin", { maxAge: 90000000, httpOnly: false, path: '/' });
          req.session.user = req.body.email_id;
          let userObject = { name: result[0].cust_name, email_id: result[0].email_id, pwd: result[0].pwd, address: result[0].address, phone_number: result[0].phone_number };
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(userObject));
        }
        else {
          res.writeHead(401, {
            'Content-Type': 'text/plain'
          });
          res.end("INCORRECT_PASSWORD");
        }
      }
      else {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("NO_USER");
      }
    });
  });

module.exports = router;