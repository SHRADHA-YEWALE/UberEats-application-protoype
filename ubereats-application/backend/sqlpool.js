const mysql = require('mysql');
const myPort = 3306;
const pool = mysql.createPool({
    connectionLimit: 100,
    host: '',
    user: '',
    port: myPort,
    password: '',
    database: 'uber_eats'
});

pool.getConnection((err) => {
    if(err){
      console.log("DB not connected!");
      throw 'Error occured: ' + err;
    }
  });
  
module.exports = pool;