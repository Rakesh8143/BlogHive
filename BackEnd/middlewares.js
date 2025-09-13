const jwt = require('jsonwebtoken')
const {Post} = require('./schemas')
const multer = require('multer')
const path = require('path')
const { error } = require('console')

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const types = /jpeg|jpg|png/;
    const extCheck = types.test(file.originalname.toLowerCase());
    const mimeCheck = types.test(file.mimetype);
    if (extCheck && mimeCheck) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file format"), false);
    }
  }
});

async function userValidation(req, res, next){
    try{
        const postId=req.params.id;
        const post = await Post.findById(postId);
        if (!post || req.user.id !== post.userId.toString()) return res.status(403).json({ error: "FORBIDDEN" });
        next();
    }
    catch(error)
    {
        console.error("userValidation error:", error.message);
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
}

function authenticate(req,res,next){
    try{
        const token= req.cookies.token;
        if(!token) return res.status(401).json({error:"NO_TOKEN"})
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decoded;
        next();
    }
    catch(error)
    {
        console.log(error)
        return res.status(401).json({error:"INVALID_TOKEN"})
    }
}

module.exports={authenticate, userValidation, upload}