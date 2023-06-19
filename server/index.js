const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const dotenv = require('dotenv');
const authrouter = require('./routes/auth');
const authverify = require('./middleware/authverify');
const postrouter = require('./routes/createpost');
const path = require('path')
var cookies = require("cookie-parser");

// middlewares
app.use(cors());
app.use(express.json());
app.use('/auth', authrouter);
app.use('/post', postrouter);
app.use(cookies());
app.use('/public', express.static(path.join(__dirname, 'public')))
dotenv.config();


//database connection
try{
    pool.connect();
    console.log("Database connected");
}catch (err){
    console.log(err);
}

//routes
app.get('/', authverify, (req, res)=>{
    console.log(req.user_id);
    res.send("Authenticated User");
})


//server listening
app.listen(5000, ()=>{
    console.log("Server is listening on port 5000")
})