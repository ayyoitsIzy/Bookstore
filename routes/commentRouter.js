const express = require('express')
const router = express.Router()
const pool = require("../db/connection");

router.get("/users_order", async(req, res) => {

  if (req.session === false || req.session === undefined) {
    res.json({error : true})
  }
   const [info] = await pool.query("select orders.* , bill.date as date , product.Prod_name as name from orders inner join bill on orders.Bill_ID = bill.Bill_ID inner join product on product.Prod_ID = orders.Prod_ID where bill.id = ? and star is NULL ",
    [req.session.ID]);
   console.log(info);
   res.json(info);
});

router.post("/post_comment", async(req, res) => {
    const data = req.body;
      const query = `update orders set star = ?, review = ? where prod_id = ? and bill_id = ?`;
    const [update] = await pool.query(query,[data.rate,data.text,data.prod_ID,data.bill_ID])
    res.json({success : true})
});



module.exports = router;