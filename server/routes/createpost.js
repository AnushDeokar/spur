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




router.post('/upload', authverify, upload.single('image'),  async(req, res)=>{
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

router.get('/fetch', async (req, res)=>{
    const {offset} = req.query;
    const {length} = req.query;
    if (offset){
    var sql = `SELECT * FROM  (SELECT p.id as post_id, p.created_at, p.title,p.image, p.description, u.name, u.id as user_id  from posts p INNER JOIN users u on p.user_id=u.id ORDER BY p.created_at DESC) AS sorted_table LIMIT 1 OFFSET ${offset};`
    const {rows} = await db.query(sql);
    if (length){
        var sql2 = 'SELECT COUNT(id) FROM posts';
        const res2 = await db.query(sql2);
        res.json({posts:rows, msg:["fetched"], success:true, count:res2.rows[0].count});
    }else if (rows.length>0){
        res.json({posts:rows, msg:["fetched"], success:true});
    }else{
        res.json({posts:rows, msg:["fetched"], success:false});
    }
    }
})

router.post('/comment', authverify, async (req, res)=>{
    try{
        var sql = 'INSERT INTO comments (comment, user_id, post_id) VALUES ($1, $2, $3)'
        await db.query(sql, [req.body.comment, req.user_id, req.body.post_id]);
        res.json({
            msg:"Successfully Added a Comment",
            success: true
        })

    }catch (err){
        console.log(err);
        res.json({
            err:err
        })
    }
})
router.get('/fetch_comment/:post_id', async (req, res)=>{
    try{
        const post_id = req.params.post_id;
        var sql = `SELECT u.username,u.name, u.id as user_id, c.comment, c.created_at from comments c INNER JOIN users u on u.id=c.user_id WHERE c.post_id=${post_id} ORDER BY c.created_at DESC`;
        const {rows} = await db.query(sql);
        res.json({allcomments:rows, success:true});
    }catch(err){
        console.log(err);
    }
})


module.exports = router;