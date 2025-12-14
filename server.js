const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const pool = require("./db/connection");

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const basketRouter = require("./routes/basketRouter");
const promotionRouter = require("./routes/promotionRouter");
const customRouter = require("./routes/customRouter");
const app = express();




app.use(cors({
  credentials: true,
  origin:['http://localhost:3000','http://127.0.0.1:5500']
}));
app.use(session({
  secret: 'secrete-key',
  resave: false,
  saveUninitialized: false,
   cookie: { 
    secure: false, 
    maxAge: 60*60*1000 
  }
}));

app.use(express.json());


// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/basket',basketRouter);
app.use('/promotion',promotionRouter);
app.use('/custom',customRouter);
// Example API data




//page route

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.html"));

});

app.get("/promotion", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Promotions.html"));

});
app.get("/status", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "customStatus.html"));

});

app.get("/basket", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "basket.html"));

});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/user_info", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Userinfo.html"));
});

app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "ProductList.html"));
});

app.get("/product_info", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Productinfo.html"));
});
app.get("/custom_order", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "CustomOrder.html"));
});



// Start server
const PORT = 3000;
app.listen(PORT, () =>{
  console.log(`Server running at http://localhost:${PORT}/product?page=1&orderby=latest`)
  //console.log(`Server running at http://localhost:${PORT}/promotion?id=1`)
  //console.log(`Server running at http://localhost:${PORT}/product_info?id=1`)
  console.log(`Server running at http://localhost:${PORT}/custom_order`)}
);