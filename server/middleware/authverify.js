const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
    const token = req.cookies['token'];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    if(token){
        req.user_id = userId;
        next();
    }else{
        res.status(401).json({
            msg:"Unauthorized",
            success:false
        })
    }
    }catch(err){
        res.status(401).json({
            msg:"Unauthorized",
            success:false
        })
    }  
};