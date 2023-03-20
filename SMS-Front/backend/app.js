const express = require('express');
const Post = require("./model/post")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const mongoose = require("mongoose");
const DB = "mongodb://localhost/SMS"
mongoose.connect(DB, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true
})
.then((con)=>{console.log("DB Connected Successfully")})
.catch((err)=>{console.log("DB Connected Unsuccessfully : ", err)})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POSt, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.get('/api/posts',async (req,res,next)=>{

    const posts  = await Post.find({})
    res
    .status(200)
    .json({message:"Posts fetched Successfully!",posts})
})

app.post("/api/posts", (req,res,next)=>{
  let post  = new Post({
    title: req.body.title,
    content:req.body.content
  });
  post.save().then((createdPost)=>{
    res.status(201).json({
      message:"Post added successfully",
      postId : createdPost._id
    });
    console.log(post)
  });


})

app.put("api/posts",(req,res,next)=>{
  next();
})

app.delete("/api/posts/:id", async (req,res,next)=>{
  console.log(req.params.id)
  await Post.deleteOne({_id:req.params.id})
  res.status(204).json({
    message:"Post deleted successfully!"
  })
})

module.exports = app;
