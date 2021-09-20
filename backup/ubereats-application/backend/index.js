const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

/*app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);*/

const db = mysql.createConnection({
  user: "admin",
  host: "sql-database-1.cxibvgtjdpev.us-east-2.rds.amazonaws.com",
  password:"shradha123",
  database: "uber_eats",
  port:3306,
});

app.post("/custRegister", (req, res) => {
  const custName = req.body.custName;
  const custEmail = req.body.custEmail;
  const custPassword = req.body.custPassword;


  bcrypt.hash(custPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO uber_eats.customer (cust_name, email_id, pwd) VALUES (?,?,?)",
      [custName, custEmail, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.post("/restoRegister", (req, res) => {
    const restoName = req.body.restoName;
    const restoEmail = req.body.restoEmail;
    const restoPassword = req.body.restoPassword;
    const restoLocation = req.body.restoLocation;
  
  
    bcrypt.hash(restoPassword, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query(
        "INSERT INTO uber_eats.restaurant (resto_name, email_id, pwd, location) VALUES (?,?,?,?)",
        [restoName, restoEmail, hash, restoLocation],
        (err, result) => {
          console.log(err);
        }
      );
    });
});

/*app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});*/

app.post("/login", (req, res) => {
  console.log("Inside customer login page");  
 
  const username = req.body.custEmail;
  const password = req.body.custPassword;
  
  db.query(
    "SELECT * FROM uber_eats.customer WHERE email_id = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log("Result from DB", result);
      console.log("Result length from DB", result.length);
      if (result.length > 0 && result != null) {
        bcrypt.compare(password, result[0].pwd, (error, response) => {
          if (response) {
            console.log("login successfull");  
            //req.session.user = result;
            //console.log(req.session.user);
            //const payload = { username: username }; //Create jwt payload
            res.status(200).json({ message: "Login Successful" });
        
          } else {
            
            console.log("login not successful!");  
            res.status(400).json({ message: "incorrect password" });
          }
        });
      } else {
        res.status(400).json({ message: "User not exists" });
      }
    }
  );
}); 


app.post("/restoLogin", (req, res) => {
    console.log("Inside restaurant login page");  
     
    const username = req.body.restoEmail;
    const password = req.body.restoPassword;
    console.log("u:", username);
    console.log("p", password);
  
    db.query(
      "SELECT * FROM uber_eats.restaurant WHERE email_id = ?;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        console.log("Result from DB", result);
        if (result.length > 0 && result != null) {
          bcrypt.compare(password, result[0].pwd, (error, response) => {
            if (response) {
              console.log("login successfull");   
              //req.session.user = result;
              //console.log(req.session.user);
              //const payload = { username: username }; //Create jwt payload
              res.status(200).json({ message: "Login Successful" });
          
            } else {
              
              console.log("login not successful!");  
              res.status(400).json({ message: "incorrect password" });
            }
          });
        } else {
          res.status(400).json({ message: "User not exists" });
        }
      }
    );
  }); 


app.listen(3001, () => {
  console.log("running server");
});
