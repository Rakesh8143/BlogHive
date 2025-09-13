const router =require('express').Router();
const {Post} = require('./schemas');
const jwt = require('jsonwebtoken')
const {authenticate, userValidation, upload} = require('./middlewares')


router.use(authenticate)
router.get("/getmypost/:id",userValidation,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id).populate('userId','userName');
        if(!post) return res.status(404).json({error:"POST_NOTFOUND"})
        res.json(post);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(500).json({msg:"SERVER_ERROR"});
    }
})
router.get("/myposts",async (req,res)=>{
    try{
        const posts = await Post.find({userId:req.user.id});
        res.json(posts);
    }
    catch(error)
    {
        console.log("getting myposts error : "+error.message)
        res.status(500).json({msg:"SERVER_ERROR"})
    }
})
router.post("/addPost",upload.single('image'),async (req,res)=>{
    try 
    {
        if(!req.file) return res.status(400).json({error:"NO_IMAGE"})
        const post= new Post({
        userId:req.user.id,
        thumbnail : {
            data: req.file.buffer.toString('base64'),
            contentType: req.file.mimetype
        },
        title:req.body.title,
        body:req.body.content,
        public : req.body.isPublic === "true",
        })
        await post.save();
        res.json({message:"successfully added",post});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:"post adding error"})
    }
})

router.delete("/delete/:id",userValidation,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch(error)
    {
        console.log("deletion error")
        res.status(500).json({ msg: "unsuccessful deletion" });
    }
})

router.patch("/update/:id",userValidation,upload.single('image'),async (req,res)=>{
    try {
        const newData={
            title : req.body.title,
            body  : req.body.body,
            public: (req.body.public==="true")
        }
        if(req.file)
        {
            newData.thumbnail={
                data : req.file.buffer.toString('base64'),
                contentType: req.file.mimetype
            }
        }
        const updatedPost= await Post.findByIdAndUpdate(req.params.id,{$set:newData},{new:true, runValidators:true});
        if(updatedPost) return res.json(updatedPost)
        return res.status(404).json({error:"NOT_FOUND"})
    }
    catch(error)
    {
        console.log(`updation error : ${error.message}`);
        res.status(500).json({error:"SERVER_ERROR"})
    }
})

module.exports =router;