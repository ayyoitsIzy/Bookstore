const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const pool = require("./db/connection");

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const basketRouter = require("./routes/basketRouter");

const app = express();




app.use(cors({
  credentials: true,
  origin:['http://localhost:3000','http://127.0.0.1:5500']
}));
app.use(session({
  secret: 'secrete-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/basket',basketRouter);
// Example API data


let user2 = [
  
];

//page route

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));

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


// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/product?page=1&orderby=latest`)
  //console.log(`Server running at http://localhost:${PORT}/product_info?id=1`)
);