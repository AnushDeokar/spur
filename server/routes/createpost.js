const express = require('express');
const router = express.Router();
require('dotenv').config();
const multer = require('multer');
const authverify = require("../middleware/authverify");
const db = require("../db");

var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/posts");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowed"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})




router.post('/', authverify, upload.single('image'),  async(req, res)=>{
    try {
        const decoded = req.user_id;
        var sql = 'INSERT INTO posts (user_id, title, description, image) VALUES ($1, $2, $3, $4)'
        await db.query(sql, [decoded, req.body.title, req.body.description, req.file.filename]);
        res.json({msg:"Post Created", success: true});
    
    } catch (err) {
        return res.status(401).send("Invalid Token please login again");
    }
}
)

module.exports = router;