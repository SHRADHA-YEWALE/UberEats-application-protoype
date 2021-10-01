const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const pool = require('../sqlpool.js');

router.get('/restaurantsearch/:search_input', (req, res) => {
    console.log("Inside restaurant search call of DB");
    let search_input = req.params.search_input;
    let search_string = "%".concat(search_input,"%");
  
    
    let sql = `SELECT DISTINCT 
    r.resto_id, r.resto_name, r.resto_description, r.res_cuisine, r.res_image, r.location, r.phone_number, r.email_id, r.zipcode
    FROM uber_eats.restaurant r
    LEFT OUTER JOIN menu_items mi
    ON mi.resto_id = r.resto_id
    LEFT OUTER JOIN menu_sections ms
    ON ms.resto_id = r.resto_id
    WHERE (mi.item_name LIKE '${search_string}')
    OR mi.item_description LIKE '${search_string}'
    OR r.resto_name LIKE '${search_string}'
    OR r.res_cuisine LIKE '${search_string}'
    OR ms.menu_section_name LIKE '${search_string}' `;

    pool.query(sql, (err, result) => {
      if (err) {
        console.log("error", err);  
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        console.log("Restaurant search result from DB", result);
        res.end(JSON.stringify(result));
      } else {
          res.end('NO_RECORD');
      }
    });
  });


  router.post('/restaurantDeliverySearch', (req, res) => {
    let search_input = req.body.searchInput;
    let search_string = "%".concat(search_input,"%");
    let deliverySearch = req.body.delivery;
    let sql ;

    if (deliverySearch && deliverySearch !== "") {
      sql = `SELECT DISTINCT 
      r.resto_id, r.resto_name, r.resto_description, r.res_cuisine, r.res_image, r.location, r.phone_number, r.email_id, r.zipcode
      FROM uber_eats.restaurant r
      LEFT OUTER JOIN menu_items mi
      ON mi.resto_id = r.resto_id
      LEFT OUTER JOIN menu_sections ms
      ON ms.resto_id = r.resto_id
      WHERE ((mi.item_name LIKE '${search_string}')
      OR mi.item_description LIKE '${search_string}'
      OR r.resto_name LIKE '${search_string}'
      OR r.res_cuisine LIKE '${search_string}'
      OR ms.menu_section_name LIKE '${search_string}')
      AND r.delivery = '${deliverySearch}' `;
    } else {
      sql = `SELECT DISTINCT 
      r.resto_id, r.resto_name, r.resto_description, r.res_cuisine, r.res_image, r.location, r.phone_number, r.email_id, r.zipcode
      FROM uber_eats.restaurant r
      LEFT OUTER JOIN menu_items mi
      ON mi.resto_id = r.resto_id
      LEFT OUTER JOIN menu_sections ms
      ON ms.resto_id = r.resto_id
      WHERE (mi.item_name LIKE '${search_string}')
      OR mi.item_description LIKE '${search_string}'
      OR r.resto_name LIKE '${search_string}'
      OR r.res_cuisine LIKE '${search_string}'
      OR ms.menu_section_name LIKE '${search_string}' `; 
    }

    pool.query(sql, (err, result) => {
      if (err) {
        console.log("error", err);  
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        console.log("Restaurant search result from DB", result);
        res.end(JSON.stringify(result));
      } else {
          res.end('NO_RECORD');
      }
    });
  });

  module.exports = router;

