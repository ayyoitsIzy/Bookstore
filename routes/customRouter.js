const express = require('express')
const router = express.Router()
const pool = require("../db/connection");

router.get("/users_custom", async(req, res) => {

  if (req.session === false || req.session === undefined) {
    res.json({error : true})
  }
   const [info] = await pool.query("select custom_order.* from custom_order inner join bill on bill.bill_id = custom_order.Bill_ID where ID = ?;",[req.session.ID]);
   console.log(info);
   console.log(req.session);
   res.json(info);
});


module.exports = router;