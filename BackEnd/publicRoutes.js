const router =require('express').Router();
const {Post} = require('./schemas');

router.get("/allposts",async (req,res)=>{
    try{
        const posts = await Post.find({public:true}).populate('userId','userName');
        res.json(posts)
    }
    catch(error)
    {
        console.log("getting posts error : "+error.message)
        res.status(500).json({msg:"SERVER_ERROR"})
    }
})

router.get("/getpost/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post || !post.public) return res.status(404).json({error:"POST_NOTFOUND"})
        res.json(post);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(500).json({msg:"SERVER_ERROR"});
    }
})

module.exports = router