const express = require('express')
const router = express.Router()
const pool = require("../db/connection");
const session = require('express-session');


//product//
router.post("/add_product",async (req,res)=>{
    if (!Array.isArray(req.session.basket)) {
                req.session.basket = [];
                req.session.productList = []
            }
    if (req.session.ID == undefined) {
        res.status(400).json({
                    success: false,
                    message: "Invalid request"
            });
        res.json({ success: false});
        return;

    } 
    for (let i = 0;i<req.session.basket.length;i++){
        if(req.session.basket[i].prod_ID === req.body.prod_ID){
            const [rows] = await pool.query(`select product_stock from product where prod_id =  ?`,req.body.prod_ID);
            const limit = rows[0].product_stock;
            if(req.session.basket[i].amount + req.body.amount < limit ){
                req.session.basket[i].amount += req.body.amount;
                // for (let j = 0;j<req.session.productList.length;j++){
                //     if(req.session.productList[j].prod_ID === req.body.prod_ID){
                //         req.session.productList[j].amount += req.body.amount
                //     }
                // }
                res.json({ success: true });
            }else{
                res.status(400).json({
                    success: false,
                    message: "Invalid request"
                    });
                    res.json({ success: false});
            }
            return;
        }
    }
    req.session.basket.push({prod_ID : req.body.prod_ID,amount : req.body.amount});
    // req.session.productList.push({prod_ID : req.body.prod_ID,amount : req.body.amount});
    console.log(req.session.productList);
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
router.get("/discount",async (req,res)=>{
    const id = req.session.ID
    const info = {type:null,percent:0}
    const [rows] = await pool.query("select * from discount inner join user on user.Tier = discount.Tier where id = ?",id);
    info.type = rows[0].Tier
    info.percent = rows[0].discount
    res.json(info)
})




router.post("/add_promotion",async (req,res)=>{
    if (!Array.isArray(req.session.basket)) {
                req.session.basket = [];
                req.session.productList = []
            }
    if (req.session.ID == undefined) {
        res.status(400).json({
                    success: false,
                    message: "Invalid request"
            });
        res.json({ success: false});
        return;

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
                res.status(400).json({
                success: false,
                message: "Invalid request"
                });
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
        res.json({ success: false});
    }

})
//custom//
router.post("/add_custom",async (req,res)=>{
    if (!Array.isArray(req.session.basket)) {
                req.session.basket = [];
                req.session.productList = []
            }
    if (req.session.ID == undefined) {
        res.status(400).json({
                    success: false,
                    message: "Invalid request"
            });
        res.json({ success: false});
        return;
    } 
    req.session.basket.push({amount : 1, price : 450, prod_name : req.body.prod_name , img : "IMG/MenuIMG/t-shirt.png",
        name:req.body.name , dept:req.body.dept , breast:req.body.breast , waist:req.body.waist , arm:req.body.arm
     });
    res.json({ success: true });
})
//get_basket//
router.get("/get_basket",async(req,res)=>{
    try {
        let temparray = Array.from(req.session.basket)
        for(let i = 0;i<req.session.basket.length;i++){
        //that thing in basket is a promotion(all nessesary info to use is already provided)
        if("promotion_ID" in temparray[i]){
            continue;
        }
        //that thing in basket is a custom_product(all nessesary info to use is already provided)
        if("name" in temparray[i]){
            continue;
        }
        //that thing in basket is a regular_product(info is needed from database)
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
    if (!Array.isArray(req.session.basket) || req.session.basket.length === 0 ) {
                console.log("basket_empty");
                res.json({ success: false });
                return;
            }
    if (req.session.ID == undefined) {
        res.status(400).json({
                    success: false,
                    message: "Invalid request"
            });
        res.json({ success: false});
        return;
    } 
    let total = 0;
    console.log("make_bill");
    let product_total = new Map();
    let product = [];
    let order = [];
    let promotion = [];
    let custom = [];
    for (let i = 0;i<req.session.basket.length;i++){
        if("prod_ID" in req.session.basket[i] ){
                const [limit] = await pool.query("select * from product where prod_id = ?",req.session.basket[i].prod_ID)
                total += limit[0].Price * req.session.basket[i].amount;
                if(limit[0].Product_stock < req.session.basket[i].amount){res.json({success : false});return;}
                product_total.set(parseInt(req.session.basket[i].prod_ID),req.session.basket[i].amount);
                product.push(parseInt(req.session.basket[i].prod_ID));
                order.push({prod_ID : parseInt(req.session.basket[i].prod_ID) , amount : req.session.basket[i].amount});
                continue;
        }
        if("name" in req.session.basket[i]){
            custom.push(req.session.basket[i])
            total += req.session.basket[i].price;
        }
    }
    console.log(product_total);
     for(let i = 0;i<req.session.basket.length;i++){
         if("promotion_ID" in req.session.basket[i]){
             promotion.push({promotion_ID : req.session.basket[i].promotion_ID , amount : req.session.basket[i].amount});
            total += req.session.basket[i].price * req.session.basket[i].amount;
             const [rows] = await pool.query("select Promotion_ID, Prod_ID, Amount as promotion_amount from promotion_item where promotion_id = ?",req.session.basket[i].promotion_ID)
             for (let j = 0; j < rows.length; j++) {
                const prod = rows[j].Prod_ID;
                const [limit] = await pool.query("select * from product where prod_id = ?",prod)
                if (product_total.get(prod) === undefined) {
                    if(limit[0].Product_stock < req.session.basket[i].amount * rows[j].promotion_amount){res.json({success : false});return;}
                    product_total.set(prod,req.session.basket[i].amount * rows[j].promotion_amount);
                    product.push(prod);
                } else {
                    let original_amount = product_total.get(prod)
                    original_amount += rows[j].promotion_amount * req.session.basket[i].amount;
                    if(limit[0].Product_stock < original_amount){res.json({success : false});return;}
                    product_total.set(prod,original_amount);
                }
             }
         }
     }

    for(let i = 0;i<product.length;i++){
        const [rows] = await pool.query("update product set product_stock = product_stock - "+ product_total.get(product[i])+" where prod_id = ?;",product[i]);
    }
    const id = req.session.ID
    const [rows] = await pool.query("select * from discount inner join user on user.Tier = discount.Tier where id = ?",id);
    const discount = rows[0].discount

    const [bill] = await pool.query("INSERT INTO bill (ID, total_price, date) VALUES(?,?,current_time());", [req.session.ID, Number((total - (total * (discount/100))).toFixed(2))]);
    const bill_id  = bill.insertId;
    console.log(promotion);
    for(let i = 0;i<promotion.length;i++){
        const [rows] = await pool.query("insert into promotion_order (promotion_id,bill_id,amount) value (?,?,?)",[promotion[i].promotion_ID,bill_id,promotion[i].amount]);
    }
    for(let i = 0;i<order.length;i++){
        const [rows] = await pool.query("insert into orders (prod_id,bill_id,amount) value (?,?,?)",[order[i].prod_ID,bill_id,order[i].amount]);
    }
    for(let i = 0;i<custom.length;i++){
        const thiscustom = custom[i];
        console.log(thiscustom);
      const [rows] = await pool.query("insert into custom_order ( NAME, faculty, waist, hip, arm, price, status, Bill_ID) value (?,?,?,?,?,?,?,?) "
        ,[thiscustom.name,thiscustom.dept,thiscustom.waist,thiscustom.breast,thiscustom.arm,thiscustom.price,"Pending",bill_id]);
      }
    req.session.basket = [];
    req.session.productList = []
    res.json({ success: true });
    

})

module.exports = router;