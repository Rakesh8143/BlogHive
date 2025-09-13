const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    userName : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    }
})
const postSchema=new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    thumbnail :{
        data : String,
        contentType : String
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    public:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type : Date,
        default: Date.now,
        immutable : true
    },
    updatedAt:{
        type:Date,
        default : Date.now
    }
})
const User=mongoose.model("User",userSchema);
const Post=mongoose.model("Post",postSchema);
module.exports = {User,Post};