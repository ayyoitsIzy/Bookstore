const express = require('express')
const router = express.Router()
const pool = require("../db/connection");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
router.use(cors({
  credentials: true,
  origin:['http://localhost:3000','http://127.0.0.1:5500']
}));
router.use(session({
  secret: 'secrete-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 }
}));





module.exports = router;