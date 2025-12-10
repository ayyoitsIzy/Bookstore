const express = require('express')
const router = express.Router()
const pool = require("../db/connection");


//product//
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
    //console.log(req.session.basket);
})

router.post("/increase_product",async (req,res)=>{
     const [rows] = await pool.query(`select Product_stock from product where Prod_id = ? `,req.session.basket[req.body.index].prod_ID);
    console.log(req.session.basket[req.body.index].amount)
    if (req.session.basket[req.body.index].amount < rows[0].Product_stock) {
        req.session.basket[req.body.index].amount += 1;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
    //console.log(req.session.basket);
})
router.post("/decrease_product",async (req,res)=>{
    req.session.basket[req.body.index].amount -=1;
    console.log(req.session.basket[req.body.index].amount)
    if (req.session.basket[req.body.index].amount == 0) {
        req.session.basket.splice(req.body.index,1);
    } 
    res.json({ success: true });
    //console.log(req.session.basket);
})
router.post("/delete",async (req,res)=>{
    req.session.basket.splice(req.body.index,1);
    res.json({ success: true });
    //console.log(req.session.basket);
})

//promotion//


//get_basket//
router.get("/get_basket",async(req,res)=>{
    try {
        let temparray = Array.from(req.session.basket)
        for(let i = 0;i<req.session.basket.length;i++){
        const [rows] = await pool.query(`SELECT 
                product.Prod_ID, Prod_name, Price, MIN(Path) AS Thumbnail
            FROM
                product
                    INNER JOIN
                image ON product.prod_id = image.prod_id
            GROUP BY product.Prod_ID , Prod_name , Price having prod_id = ? `,req.session.basket[i].prod_ID);
        temparray[i].img =rows[0].Thumbnail;
        temparray[i].price =rows[0].Price;
        temparray[i].prod_name =rows[0].Prod_name;
    }
    res.json(temparray);
    } catch (error) {
        res.json([])
    }
    
    

})

module.exports = router;