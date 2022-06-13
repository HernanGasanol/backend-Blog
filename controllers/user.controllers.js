const bcrypt=require('bcrypt')
const User=require('../models/User.model.js')
const Post=require('../models/post.model')


//funciona

const getUser=async(req,res)=>{


  try{
    const user=await User.findById({_id:req.params.id}).populate('posts')
 
    if(!user){
      return  res.status(404).json({ok:false, msg:'user not found'})
    }
  
    
    const {email, username,name ,lastname, age, id,profilepic, posts}=user
      
    
   return res.status(200).json({ok :true,user:{
        id, 
        username,
        email,
        name,
        lastname,
        age,
        profilepic,
        posts
    }})

 }catch(e){
    return res.status(500).json({ok:false, msg:'internar error'})
 }
    
}

//funciona

const getUsers = async (req, res) => {
  const username = req.query.username;

  if (username) {
    try {
      const users = await User.findOne({ username }).populate("posts");
      if(!users){
        return res.status(404).json({ ok: false, msg: "no content" });
      }
        return res.status(200).json({ ok: true, users });

    } catch (error) {
      console.log(error);
     return res.status(500).json({ ok: false, msg: "internar error" });
    }
  } else {
    try {
      const users = await User.find().populate("posts");
      if(!users){
        return res.status(404).json({ ok: false, msg: "no content" });
      }
         return  res.status(200).json({ ok: true, users });
    } catch (error) {
      return res.status(500).json({ ok: false, msg: "internar error" });
    }
  }
}; 



//funciona

const updateUser = async (req, res) => {
  try {
    const { uid } = req;

    let user = await User.findById({ _id: uid });
    if (uid !== req.params.id || user.id !== uid) {
     return res.status(403).json({ ok: false, msg: "you cannot updatenon-own content." });
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      req.body.password = hashedPassword;

      let updateUser = await User.findByIdAndUpdate(user.id,{ $set: req.body },{ new: true });

      const { username, email,name, lastname, age, password, profilepic, posts } = updateUser;
      return res.status(201).json({ ok: true, user: { username, email, name, lastname,age, profilepic, posts } });
    }

    let updateUser = await User.findByIdAndUpdate(user.id,{ $set:req.body },{ new: true }
    );
    
    const { username, email,name, lastname, age, password, profilepic, posts } = updateUser;

   return res.status(201).json({ ok: true, user: { username, email, name, lastname, age,profilepic, posts } });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "internal error" });
  }
};

//funciona
const deleteUser=async(req , res)=>{

    try {
        const { uid } = req;
    
        let user = await User.findOne({ id: uid });
       
        if (user.id !== req.params.id) {
          return res.status(403).json({ ok: false, msg: "you cannot remove non-own content." });
        }
    
                 
        await Post.deleteMany({user:user.id})
          
        let deleteUser = await User.findByIdAndDelete(user.id);
    
        return res.status(200).json({ ok: true, msg:'user deleted'});
     
    } catch (error) {
       return res.status(500).json({ ok: false, msg: "internal error" });
      }


    
}




module.exports={
    getUser,
    getUsers,
   updateUser,
   deleteUser
}