const express = require('express')
const router = express.Router()
const pool = require("../db/connection");



router.post("/add_product",(req,res)=>{

    if (!Array.isArray(req.session.basket)) {
                console.log("initial basket")
                req.session.basket = [];
            }

    for (let i = 0;i<req.session.basket.length;i++){
        if(req.session.basket[i].prod_ID === req.body.prod_ID){
            req.session.basket[i].amount += req.body.amount;
            console.log(req.session.basket);
            res.json({ success: true });
            return;
        }
        
    }
    req.session.basket.push({prod_ID : req.body.prod_ID,amount : req.body.amount});
    
    res.json({ success: true });
    console.log(req.session.basket);
})


router.get("/get_basket",(req,res)=>{
    res.json(req.session.basket);
})

module.exports = router;