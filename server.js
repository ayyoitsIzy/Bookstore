const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const pool = require("./db/connection");
const userRouter = require("./routes/userRouter");
const app = express();


app.use(cors({
  credentials: true,
  origin:['http://localhost:3000','http://127.0.0.1:5500']
}));
app.use(session({
  secret: 'secrete-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 }
}));

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use('/user',userRouter);
// Example API data


let user2 = [
  
];

//page route

app.get("/", async(req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
   const sql = 'select * from user';
  const [rows] = await pool.query(sql);
  //console.log(rows);
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Login.html"));
});

app.get("/user_info", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Userinfo.html"));
});



// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);