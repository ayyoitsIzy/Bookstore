const express = require('express')
const router = express.Router()
const pool = require("../db/connection");



router.get("/user_info", async(req, res) => {
  if (req.session === false || req.session === undefined) {
    res.json({error : true})
  }
   const [info] = await pool.query("select * from user where ID = ?",[req.session.ID]);
   console.log(info);
   console.log(req.session);
   res.json(info.at(0));
});


router.post("/login", async(req, res) => {
  let data = req.body;
  if("Email" in data){
    const [check] = await pool.query("select password,ID from user where Email = ?",[data.Email]);
    if (check.length == 0) { 
            res.json({ success: false ,error: "No Email Found"});
            return;
    }
    console.log(check.at(0));
    console.log(data.password); 
    if (data.password === check[0].password) { 
            console.log("correct password");
            req.session.ID = check[0].ID;
            req.session.login = true;
            req.session.basket = [];
            res.json({ success: true });
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
    console.log(check[0].password);
    console.log(data.password);
    if (data.password === check.at(0).password) { 
            console.log("correct password");
            req.session.ID = check[0].ID;
            req.session.login = true;
            req.session.basket = [];
            res.json({ success: true });
            return;
    }else{
            console.log("Incorrect password");
            res.json({ success: false ,error: "Incorrect password"});
            return;      
    }
  }
  
});

router.post("/logout",(req,res) =>{
  req.session.basket = []
  req.session.ID = undefined;
  req.session.login = false;
  res.json({success:true});
})

router.post("/delete_account",async (req,res) =>{
  const allbill = await pool.query("select Bill_ID from bill where id = ?",req.session.ID);
  for(let i = 0;i<allbill[0].length;i++){
   const setnull = await pool.query("update bill set id = null where bill_id = ? ",allbill[0][i].Bill_ID);
  }
  const del = await pool.query("delete from user where id = ?;",req.session.ID);
  req.session.basket = []
  req.session.ID = undefined;
  req.session.login = false;
  res.json({success:true});
})



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
  const [check2] = await pool.query("select Phone from user where Phone = ?",data.phone);
  if (check2.length != 0) { 
    res.json({ success: false ,error: "Duplicate phone"});
    return;
  }


  const sql = 'INSERT INTO user (first_name, Last_name, Email, Password, Phone, User_status, Tier) VALUES (?, ?, ?, ?, ?, "active", "member")';
  const [rows] = await pool.query(sql,[data.Name,data.Surname,data.Email,data.password,data.phone]);

  const [getID] = await pool.query("select ID from user where Email = ?",[data.Email]);
  req.session.ID = getID.at(0).ID;
  req.session.login = true;
  req.session.basket = [];
  res.json({ success: true });
});


module.exports = router;