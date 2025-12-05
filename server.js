const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");


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

// Example API data


let user2 = [
  
];

//API endpoint

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/api/check_session",(req,res)=>{
  res.json(req.session);
})

app.get("/api/users", (req, res) => {
  console.log("mock db");
  res.json(user2);
});

app.get("/api/user_session", (req, res) => {
  console.log("session test");
  console.log(req.session.user);
  res.json(req.session.user);
});


app.post("/api/login", (req, res) => {
  //const { username, password } = req.body;
  req.session.user = req.body
  req.session.login = true
  console.log(req.session.user);
  res.json({ success: true });
  user2.push(req.body);
});


// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);