require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser')
const jwt= require('jsonwebtoken')
const app=express();
const mongoose = require('mongoose')
const userRouter = require("./userRoutes")
const postRouter =require('./postRoutes')
const publicRoutes =require('./publicRoutes')
const cors = require('cors')
const url='mongodb://localhost:27017/myAppDB'

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json())
app.use(cookieParser());
async function startServer() {
    await mongoose.connect(url);
    console.log("connected to db")
    app.use("/users",userRouter)
    app.use("/posts",publicRoutes)
    app.use("/posts",postRouter)
    app.listen(process.env.PORT,()=>console.log(`server started at ${process.env.PORT}`))
}
startServer()