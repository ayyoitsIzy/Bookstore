const express = require('express')
const router = express.Router()
const pool = require("../db/connection");


router.get("/promotion_info/:id", async (req, res) => {
  const id = req.params.id;
    console.log(id);


    const [rows] = await pool.query(
      `
      WITH original_price AS (
        SELECT 
          promotion_item.Promotion_ID,
          SUM(product.Price * promotion_item.Amount) AS Original_Price
        FROM promotion_item
        INNER JOIN product 
          ON product.Prod_ID = promotion_item.Prod_ID
        GROUP BY promotion_item.Promotion_ID
        HAVING promotion_item.Promotion_ID = ?
      )
      SELECT promotion.*, original_price.Original_Price
      FROM promotion
      INNER JOIN original_price 
        ON original_price.Promotion_ID = promotion.Promotion_ID
      WHERE promotion.Promotion_ID = ?;
      `,
      [id,id]
    );
    console.log(rows.at(0));
    res.json(rows.at(0));
    
  
});


router.get("/promotion_item/:id", async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query(
      `
      WITH thumbnail AS (
        SELECT 
          product.Prod_ID,
          product.Prod_name,
          product.Price,
          MIN(image.Path) AS Thumbnail
        FROM product
        INNER JOIN image 
          ON product.Prod_ID = image.Prod_ID
        GROUP BY 
          product.Prod_ID,
          product.Prod_name,
          product.Price
      )
      SELECT 
        product.Prod_ID,
        product.Prod_name,
        thumbnail.Thumbnail,
        product.Price AS price_per_item,
        promotion_item.amount,
        (product.Price * promotion_item.amount) AS total
      FROM promotion_item
      INNER JOIN thumbnail 
        ON thumbnail.Prod_ID = promotion_item.Prod_ID
      INNER JOIN product 
        ON product.Prod_ID = thumbnail.Prod_ID
      WHERE promotion_item.Promotion_ID = ?;
      `,
      [id]
    );

    res.json(rows);
  
});


module.exports = router;