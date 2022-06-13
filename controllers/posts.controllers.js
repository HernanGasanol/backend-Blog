const User=require('../models/User.model')
const Post=require('../models/post.model');
const { use } = require('../router/upload.routes');



//funciona
const createPost=async(req , res)=>{
   const{uid,email}=req
   const {title,desc, picture,hashtags }=req.body
   
   try {
      const user=await User.findOne({email});
       
         if(!user || uid !== user.id){
           return res.status(400).json({ok:false , msg:'invalid user'});
         }

      const newPost= new Post({
          title,
          desc,
          picture,
          hashtags,
          user:user._id
       });
        
      
      
        const savedPost=await newPost.save();

         

         user.posts=user.posts.concat(savedPost._id)
       
         await user.save()
       return res.status(201).json({ok:true , msg:'post created successfully' , savedPost});

   }catch(e) {
       
       console.log(e)
      return res.status(500).json({ok:false, msg:'internal error'})
   }

}
//funciona
const getPosts=async(req,res)=>{
   
   const username=req.query.username;
   const hashtag=req.query.hashtag;
   

   try {
     
     if(username){

         let user=await User.findOne({username}).populate('user')

            console.log(user.id)

        let posts=await Post.find({user:user.id}).populate('user')
      
      if(!posts){
          return res.status(404).json({ok:false, msg:'there are no posts available'}) 
      }

     
    
      return res.status(200).json({ok:true , posts})
       
      }else if(hashtag){
      let  posts=await Post.find({hashtags:{$in:[hashtag]},})
      
      if(!posts){
         return res.status(404).json({ok:false, msg:'there are no posts available'})
      }
     
      return res.status(200).json({ok:true , posts})


   
 
   }else{
         let posts=await Post.find().populate('user')
        if(!posts){
         return res.status(404).json({ok:false, msg:'there are no posts available'})
        }
         
        return res.status(200).json({ok:true , posts})

   }
     

}catch (error) {
     return res.status(500).json({ok:false , msg:'internal error'})
   }
}



//funciona
const getPost=async(req,res)=>{
   try {
      const post=await Post.findById(req.params.id).populate('user');
      
      if(!post){
         return  res.status(404).json({ok:false, msg:'failed search'})
      }
      
      return res.status(200).json({ok:true , post})
      
    } catch (error) {
      return res.status(500).json({ok:false , msg:'internal error'})
    } 

}


//funciona
const updatePost=async(req , res)=>{

   try {
       const{uid}=req;
       const {id}=req.params;
 
   
      const post=await Post.findById({_id:id}) 
 
       if(post.user.toString() !== uid ){
          return res.status(403).json({ok:false , msg:"you cannot update non-own content."});
       }
    
       
       
       const updatePost={
         ...req.body,
         user:uid
       }
   
   
       const updateEvent=await Post.findByIdAndUpdate(post,updatePost, {new:true})
   
     
       
   
      return  res.status(200).json({ok:true , msg:'update operation succesful' , updatedPost:updatePost})

   } catch (error) {
        console.log(error)
      return res.status(500).json({ok:false, msg:'internal error'})
    
   }


}

//funciona
const deletePost=async(req , res)=>{

try {
      const{uid}=req;
      const {id}=req.params;



      let user=await User.findById({_id:uid})
  

      const post=await Post.findById({_id:id});
     

      if(!post){
         return res.status(400).json({ok:false , msg:'the post you are trying to delete does not exist'});
      }

      
      if(post.user.toString() !== uid){
         return res.status(401).json({ok:false , msg:"you cannot remove non-own content."})
       }
   
     const postDeleted= await Post.findOneAndDelete({_id:id})
         
     await User.updateOne({_id:uid},{$pullAll:{posts:[post._id]}})

     await user.save()

      return res.status(200).json({ok:true , msg:'delete post succesful', postDeleted})

  } catch (error) {
     console.log(error)
    return res.status(500).json({ok:false, msg:'internal error'})
  
     
  }

}





module.exports={
   createPost,
   getPosts,
   getPost,
   updatePost,
   deletePost
}