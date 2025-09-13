const express =require("express")
const router = express.Router();
const {User} = require("./schemas")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const {authenticate}=require('./middlewares')

router.get("/verify",authenticate,(req,res)=>{
    console.log(req.user.uname)
    res.json({userName:req.user.uname})
})
router.post("/login",async (req,res)=>{
    try{
        console.log(req.body)
        const {userName, password} = req.body;
        const user=await User.findOne({userName:userName});
        console.log("user :"+user)
        if(!user) return res.status(401).json({error:"INVALID_CREDENTIALS1"});
        const isValidPwd=await bcrypt.compare(password,user.password);
        if(!isValidPwd) return res.status(401).json({error:"INVALID_CREDENTIALS2"});
        const payload={
            id:user._id,
            uname:user.userName
        }
        const { password: _, ...safeUser } = user.toObject();
        const token=jwt.sign(payload,process.env.SECRET_KEY)
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        }).json({user:safeUser,message:"token sent successfully"});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"login error"});
    }
})
router.post("/register",async (req,res)=>{
    try{
        const {userName, password, email} = req.body;
        const exists= await User.exists({userName:userName})
        if(exists) {
            return res.status(409).json({error:"USERNAME_TAKEN"});
        }
        const hashedpwd = await bcrypt.hash(password,10);
        const user = await User.create({userName : userName,
            password : hashedpwd,
            email:email
        })
        console.log(user)
        const payload={
            id:user._id,
            uname:user.userName
        }
        const token=jwt.sign(payload,process.env.SECRET_KEY)
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        }).json({message:"token sent successfully",userName:user.userName});
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({error :  "failed to register"})
    }
})

router.post('/logout',(req, res)=>{
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
})

module.exports = router;