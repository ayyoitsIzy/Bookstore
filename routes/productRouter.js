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
    sqlorder  = "Product_stock"
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
  



  let sql = "select product.Prod_ID,Prod_name,product_stock,Price, MIN(Path) as Thumbnail from product inner join image on product.prod_id = image.prod_id " 
  + where + " group by product.Prod_ID,Prod_name,Price order by " 
  + sqlorder + " limit 18 offset ?;"

  const [info] = await pool.query(sql,(pages-1)*18);
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




module.exports = router;