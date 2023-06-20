const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Middleware
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/', (req, res)=>{
    console.log(req.body);
    res.send("Hello from auth module");
})

router.post('/signup', async (req, res)=>{  
    try {
        //CHECK IF USER EXISTS
        const {name, username, password} = req.body;
        var checkuser = 'SELECT * FROM users WHERE username= $1';
        const Userexists = await db.query(checkuser, [username]);
        if (Userexists.rows.length>0){
            res.json({
                msg:"Username already Exists",
                status: false
            })
        }else{
             // INSERT INTO DATABASE
            var sql = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3)'
            const hashedpassword = await bcrypt.hash(password, 10); 
            await db.query(sql, [name, username, hashedpassword]);
            res.json({
                msg:"User successfully added",
                success: true,
            })
        }
    }catch(err){
        console.log("Signup Error ", err);
    }
})



router.post('/login', async (req, res)=>{
    try{
        const {username, password} = req.body;
        var checkuser = 'SELECT * FROM users WHERE username= $1';
        const Userexists = await db.query(checkuser, [username]);
        if (Userexists.rows.length===0){
            res.json({
                msg:"Invalid Username!",
                success: false
            })
        }else{
            bcrypt.compare(password, Userexists.rows[0].password, function(err, bcryptresponse) {
                if (err){
                  console.log(err);
                }
                if (bcryptresponse) {
                    // Send JWT
                    let payload = {id:Userexists.rows[0].id};
                    const token = jwt.sign(payload, process.env.JWT_SECRET);
                    return res.status(200).cookie('token', token, { httpOnly: true }).json({success:true, msg:"User Logged in", user_id:Userexists.rows[0].id, username:Userexists.rows[0].username, name:Userexists.rows[0].name, token: token})
                } else {
                    return res.json({success: false, msg: 'Passwords do not match'});
                }
              });
        }

    }catch(err){
        console.log("Login", err);
    }
})

router.get('/logout', (req, res)=>{
    try {
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
          success: true,
          message: 'Logged out successfully',
        })
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({
          error: error.message,
        })
    }
})
module.exports = router;