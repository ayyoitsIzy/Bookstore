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

router.get("/productlist/:page/:orderby", async(req, res)=>{
  const data = req.params
  const pages = data.page;
  const order = data.orderby;

  let sqlorder = "ID";

  if(order==="popular"){
    sqlorder  = "Product_stock"
  }
  if(order==="pricedown"){
    sqlorder  = "Price ASC"
  }
  if(order==="priceup"){
    sqlorder  = "Price DESC"
  }
  if(order==="latest"){
    sqlorder  = "Prod_ID"
  }


  let sql = "select * from product order by " + sqlorder + " limit 18 offset ?;"
  console.log(sql,[sqlorder ,(pages-1)*18])
  const [info] = await pool.query(sql,(pages-1)*18);
  console.log(sql,[sqlorder ,(pages-1)*18])
  console.log(info);
  res.json(info)
})




router.get("/product_info/:id", async(req, res)=>{

  const id = req.params.id

  const [info] = await pool.query("select * from product where prod_id = ?;",id);
  res.json(info.at(0));
})


module.exports = router;