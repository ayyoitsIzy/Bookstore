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
    //console.log(req.session.basket);
})


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