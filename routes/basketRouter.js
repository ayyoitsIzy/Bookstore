const express = require('express')
const router = express.Router()
const pool = require("../db/connection");
const session = require('express-session');


//product//
router.post("/add_product",async (req,res)=>{
    if (!Array.isArray(req.session.basket)) {
                req.session.basket = [];
            }

    for (let i = 0;i<req.session.basket.length;i++){
        if(req.session.basket[i].prod_ID === req.body.prod_ID){
            const [rows] = await pool.query(`select product_stock from product where prod_id =  ?`,req.body.prod_ID);
            const limit = rows[0].product_stock;
            if(req.session.basket[i].amount + req.body.amount < limit ){
                req.session.basket[i].amount += req.body.amount;
                res.json({ success: true });
            }else{
                res.json({ success: false});
            }
            return;
        }
    
        
    }
    req.session.basket.push({prod_ID : req.body.prod_ID,amount : req.body.amount});
    
    res.json({ success: true });
})

router.post("/increase_product",async (req,res)=>{
     console.log("called")
     const [rows] = await pool.query(`select Product_stock from product where Prod_id = ? `,req.session.basket[req.body.index].prod_ID);
    if (req.session.basket[req.body.index].amount < rows[0].Product_stock) {
        req.session.basket[req.body.index].amount += 1;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
})
router.post("/decrease",async (req,res)=>{
    req.session.basket[req.body.index].amount -=1;
    if (req.session.basket[req.body.index].amount == 0) {
        req.session.basket.splice(req.body.index,1);
    } 
    res.json({ success: true });
})
router.post("/delete",async (req,res)=>{
    req.session.basket.splice(req.body.index,1);
    res.json({ success: true });
})

//promotion//
router.post("/add_promotion",async (req,res)=>{
    if (!Array.isArray(req.session.basket)) {
                req.session.basket = [];
            }

    for (let i = 0;i<req.session.basket.length;i++){
        if(req.session.basket[i].promotion_ID === req.body.promotion_ID){
            const [rows] = await pool.query(`select min(product_Stock/Amount) as max from promotion_item 
                        inner join product on promotion_item.Prod_ID = product.Prod_ID where promotion_id = ? group by promotion_id ;
                        `,req.body.promotion_ID);
            const limit = rows[0].max;
            if(req.session.basket[i].amount + req.body.amount < limit ){
                req.session.basket[i].amount += req.body.amount;
                res.json({ success: true });
            }else{
                res.json({ success: false });
            }
           
            return;
        }
    }
    req.session.basket.push({promotion_ID : req.body.promotion_ID, amount : req.body.amount, price : req.body.price, prod_name : req.body.prod_name , img : req.body.img});
    res.json({ success: true });
})
router.get("/promotion_limit/:id",async (req,res)=>{
    const id = req.params.id;
     const [rows] = await pool.query(`select min(product_Stock/Amount) as max from promotion_item 
                        inner join product on promotion_item.Prod_ID = product.Prod_ID where promotion_id = ? group by promotion_id ;
                        `,id);
    res.json(rows[0]);
})
router.post("/increase_promotion",async (req,res)=>{
     const [rows] = await pool.query(`select min(product_Stock/Amount) as max from promotion_item 
                        inner join product on promotion_item.Prod_ID = product.Prod_ID where promotion_id = ? group by promotion_id ;
                        `,req.body.promotion_ID);
    const limit = rows[0].max;
    if (req.session.basket[req.body.index].amount < limit) {
        req.session.basket[req.body.index].amount += 1;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }

})
//custom//
router.post("/add_custom",async (req,res)=>{
    if (!Array.isArray(req.session.basket)) {
                req.session.basket = [];
            }
    req.session.basket.push({amount : 1, price : 450, prod_name : req.body.prod_name , img : "IMG/test.jpg",
        name:req.body.name , dept:req.body.dept , breast:req.body.breast , waist:req.body.waist , arm:req.body.arm
     });
    res.json({ success: true });
})
//get_basket//
router.get("/get_basket",async(req,res)=>{
    try {
        let temparray = Array.from(req.session.basket)
        for(let i = 0;i<req.session.basket.length;i++){
        if("promotion_ID" in temparray[i]){
            continue;
        }
        if("name" in temparray[i]){
            continue;
        }
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
        console.log(error)
        res.json([])
    }
})
//make_bill/
router.post("/make_bill",async (req,res)=>{
    if (!Array.isArray(req.session.basket) || req.session.basket.length === 0) {
                res.json({success:false});
                console.log("basket_empty");
                return;
            }
    let total = 0;
    console.log("make_bill");
    res.json({ success: true });
    let product_total = new Map();
    for (let i = 0;i<req.session.basket.length;i++){
        if("prod_ID" in req.session.basket[i]){
            product_total.set(parseInt(req.session.basket[i].prod_ID),req.session.basket[i].amount);
            continue;
        }
        if("name" in req.session.basket[i]){}
    }
    console.log(product_total);
     for(let i = 0;i<req.session.basket.length;i++){
         if("promotion_ID" in req.session.basket[i]){
             const [rows] = await pool.query("select Promotion_ID, Prod_ID, Amount as promotion_amount from promotion_item where promotion_id = ?",req.session.basket[i].promotion_ID)
             for (let j = 0; j < rows.length; j++) {
                const prod = rows[j].Prod_ID;
                console.log(prod);
                if (product_total.get(prod) === undefined) {
                    product_total.set(prod,req.session.basket[i].amount * rows[j].promotion_amount);
                } else {
                    let original_amount = product_total.get(prod)
                    original_amount += rows[j].promotion_amount * req.session.basket[i].amount;
                    product_total.set(prod,original_amount);
                }
             }

         }
     }

    console.log(product_total);

})

module.exports = router;