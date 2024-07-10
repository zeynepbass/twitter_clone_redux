import Post  from '../models/post.js'
import mongoose from 'mongoose';


const getPosts=async (req,res)=>{

    try {
        const postMessage=await Post.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const CreatePost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({ ...post });
    // The timestamp fields (createdAt and updatedAt) will be automatically added by Mongoose

    try {
        await newPost.save(); // Save to the database
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
    // HTTP Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
};



const Delete=async (req,res)=>{
    const {id:_id}=req.params;


    if(!mongoose.Types.ObjectId.isValid(_id))  res.status(404).send('Post silindi') //mongodb object ıd olup olmadıgını kontrol ettık
  await Post.findByIdAndRemove(_id);
  res.status(200).json({message:'post silindi'})
  
  }
  const Detay=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await Post.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const duzenle=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("post bulunamadı")
  
    const guncelPost=await Post.findByIdAndUpdate(_id,post,{new:true});
    res.status(200).json(guncelPost)
}
const commentPost = async (req, res) => {
    const { id } = req.params; // Doğru şekilde id'yi req.params üzerinden alıyoruz
    const { yorum } = req.body;
  
    try {
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.comments.push(yorum);
  
      const updatedPost = await Post.findByIdAndUpdate(id, { comments: post.comments }, { new: true });
  
      res.json(updatedPost);
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

const likePost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send("Post Bulunamadı")
    const post=await Post.findById(id)
    const updatedPost=await Post.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true})
    res.status(200).json(updatedPost)
}
const goruntuPost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send("Post Bulunamadı")
    const post=await Post.findById(id)
    const updatedPost=await Post.findByIdAndUpdate(id,{goruntuCount:post.goruntuCount+1},{new:true})
    res.status(200).json(updatedPost)
}


export {
    getPosts,
    CreatePost,
    Delete,
    Detay,
    duzenle,
    commentPost,
    likePost,
    goruntuPost,

}