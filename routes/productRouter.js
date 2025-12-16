const express = require('express')
const router = express.Router()
const pool = require("../db/connection");

router.get("/productlist/:page/:orderby/:category", async(req, res)=>{
  const data = req.params
  const pages = data.page;
  const order = data.orderby;
  const category = data.category

  let sqlorder = "ID";
  console.log(category);
  if(order==="popular"){
    sqlorder  = "order_count desc"
  }
  if(order==="pricedown"){
    sqlorder  = "Price ASC"
  }
  if(order==="priceup"){
    sqlorder  = "Price DESC"
  }
  if(order==="latest"){
    sqlorder  = "Prod_ID DESC"
  }

  let where = " "
  if( category != undefined && category != "null" ){

    const match = category.match(/^search"([^"]*)"/);
    if (match) {
      where = `where Prod_name like "%`+match[1]+`%"` 
    } else {
      where  = `where category = "` + category + `" `
    }
    
  }
  console.log(where)
  



let sql =
`SELECT 
    p.Prod_ID, 
    p.Prod_name, 
    p.Product_stock, 
    p.Price, 
    MIN(i.Path) AS Thumbnail, 
    (COUNT(DISTINCT o.Bill_ID)) AS order_count 
 FROM product p 
 INNER JOIN image i ON p.Prod_ID = i.Prod_ID 
 LEFT JOIN orders o ON p.Prod_ID = o.Prod_ID `
+ where +
` GROUP BY 
    p.Prod_ID, 
    p.Prod_name, 
    p.Product_stock, 
    p.Price 
 ORDER BY ` + sqlorder +
` LIMIT 18 OFFSET ?;`;

  const [info] = await pool.query(sql,(pages-1)*18);
  res.json(info)
})

router.get("/recommended", async(req, res)=>{
  const [info] = await pool.query("select p.* , MIN(i.Path) AS Thumbnail FROM product p INNER JOIN image i ON p.Prod_ID = i.Prod_ID where product_stock != 0 GROUP BY p.Prod_ID, p.Prod_name, p.Product_stock, p.Price ");
  res.json(info)
})






router.get("/product_info/:id", async(req, res)=>{

  const id = req.params.id

  const [info] = await pool.query("select * from product where prod_id = ?;",id);
  // if (!Array.isArray(req.session.productList)) {
  //               res.json(info[0]);
  //           }else{
  //             for(let i = 0;i<req.session.productList.length;i++){
  //               if (req.session.productList[i].prod_ID == info[0].Prod_ID) {
  //                 info[0].Product_stock -= req.session.productList[i].amount;
  //               } 
  //           }
  //           res.json(info[0]);
  //           }
 res.json(info[0]);
  
  
})

router.get("/product_img/:id",async(req,res)=>{
  const id = req.params.id
  const [info] = await pool.query("select * from image where Prod_ID = ?;",id);
  res.json(info);
})

router.get("/star/:id",async(req,res)=>{
  const id = req.params.id
  const [info] = await pool.query("select avg(star) as star ,count(orders.Prod_ID) as amount from orders inner join product on orders.Prod_ID = product.prod_ID where not(isnull(star)) and product.prod_id = ?  group by orders.Prod_ID;",id);
  console.log(info);
  res.json(info[0]);
})


module.exports = router;