const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const pool = require("./db/connection");

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


//API endpoint
app.get("/api/user_info", async(req, res) => {

  if (req.session === false || req.session === undefined) {
    res.json({error : true})
  }
   const [info] = await pool.query("select * from user where ID = ?",[req.session.ID]);
   res.json(info.at(0));
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


app.post("/api/login", async(req, res) => {
  let data = req.body;
  console.log(data);
  if("Email" in data){
    const [check] = await pool.query("select password,ID from user where Email = ?",[data.Email]);
    if (check.length == 0) { 
            res.json({ success: false ,error: "No Email Found"});
            return;
    }
    console.log(check.at(0));
    console.log(data.password); 
    if (data.password === check.at(0).password) { 
            console.log("correct password");
            req.session.ID = check.at(0).ID;
            req.session.login = true;
            res.json({success: true});
            return;
    }else{
            console.log("Incorrect password");
            res.json({ success: false ,error: "Incorrect password"});
            return;
    }
  }else{
    const [check] = await pool.query("select password,ID from user where Phone = ?",[data.Phone]);
    if (check.length == 0) { 
            res.json({ success: false ,error: "No Phone found"});
            return;
    }
    console.log(check.at(0).password);
    console.log(data.password);
    if (data.password === check.at(0).Password) { 
            console.log("correct password");
            req.session.ID = check.at(0).ID;
            req.session.login = true;
            res.json({success: true});
            return;
    }else{
            console.log("Incorrect password");
            res.json({ success: false ,error: "Incorrect password"});
            return;      
    }
  }
  
  

  req.session.login = true
  res.json({ success: true });
});

app.post("/api/register", async (req, res) => {
  let data = req.body
  //check if no duplicate email
  const [check] = await pool.query("select Email from user where Email = ?",[data.Email]);
  if (check.length != 0) { 
    res.json({ success: false ,error: "Duplicate email"});
    return;
  }


  //check if no duplicate phone
  const [check2] = await pool.query("select Phone from user where Phone = ?",parseInt(data.phone));
  if (check2.length != 0) { 
    res.json({ success: false ,error: "Duplicate phone"});
    return;
  }


  const sql = 'INSERT INTO user (first_name, Last_name, Email, Password, Phone, User_status, Tier) VALUES (?, ?, ?, ?, ?, "active", "member")';
  const [rows] = await pool.query(sql,[data.Name,data.Surname,data.Email,data.password,parseInt(data.phone)]);

  const [getID] = await pool.query("select ID from user where Email = ?",[data.Email]);
  req.session.ID = getID.at(0).ID;
  req.session.login = true;
  res.json({ success: true });
});


// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);