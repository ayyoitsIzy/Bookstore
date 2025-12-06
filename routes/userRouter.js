const express = require('express')
const router = express.Router()
const pool = require("../db/connection");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
router.use(cors({
  credentials: true,
  origin:['http://localhost:3000','http://127.0.0.1:5500']
}));
router.use(session({
  secret: 'secrete-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 }
}));



router.get("/user_info", async(req, res) => {
  if (req.session === false || req.session === undefined) {
    res.json({error : true})
  }
   const [info] = await pool.query("select * from user where ID = ?",[req.session.ID]);
   console.log(info);
   console.log(req.session);
   res.json(info.at(0));
});

router.get("/user_session", (req, res) => {
  console.log("session test");
  console.log(req.session.user);
  res.json(req.session.user);
});

router.post("/login", async(req, res) => {
  let data = req.body;
  console.log(data);
  if("Email" in data){
    const [check] = await pool.query("select password,ID from user where Email = ?",[data.Email]);
    if (check.length == 0) { 
            res.json({ success: false ,error: "No Email Found"});
            return;
    }
    console.log(check.at(0));
    console.log(data.password); 
    if (data.password === check.at(0).password) { 
            console.log("correct password");
            req.session.ID = check.at(0).ID;
            req.session.login = true;
            res.json({success: true});
            return;
    }else{
            console.log("Incorrect password");
            res.json({ success: false ,error: "Incorrect password"});
            return;
    }
  }else{
    const [check] = await pool.query("select password,ID from user where Phone = ?",[data.Phone]);
    if (check.length == 0) { 
            res.json({ success: false ,error: "No Phone found"});
            return;
    }
    console.log(check.at(0).password);
    console.log(data.password);
    if (data.password === check.at(0).password) { 
            console.log("correct password");
            req.session.ID = check.at(0).ID;
            req.session.login = true;
            res.json({success: true});
            return;
    }else{
            console.log("Incorrect password");
            res.json({ success: false ,error: "Incorrect password"});
            return;      
    }
  }
  
});

router.get("/check_session",(req,res)=>{
  res.json(req.session);
})

router.post("/register", async (req, res) => {
  let data = req.body
  //check if no duplicate email
  const [check] = await pool.query("select Email from user where Email = ?",[data.Email]);
  if (check.length != 0) { 
    res.json({ success: false ,error: "Duplicate email"});
    return;
  }


  //check if no duplicate phone
  const [check2] = await pool.query("select Phone from user where Phone = ?",parseInt(data.phone));
  if (check2.length != 0) { 
    res.json({ success: false ,error: "Duplicate phone"});
    return;
  }


  const sql = 'INSERT INTO user (first_name, Last_name, Email, Password, Phone, User_status, Tier) VALUES (?, ?, ?, ?, ?, "active", "member")';
  const [rows] = await pool.query(sql,[data.Name,data.Surname,data.Email,data.password,parseInt(data.phone)]);

  const [getID] = await pool.query("select ID from user where Email = ?",[data.Email]);
  req.session.ID = getID.at(0).ID;
  req.session.login = true;
  res.json({ success: true });
});


module.exports = router;