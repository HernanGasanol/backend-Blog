
const mongoose=require('mongoose')
const Post=require('./post.model')



const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        default:"",
        trim:true
    },
    lastname:{
        type:String,
        default:"",
        trim:true
    },
    age:{
        type:Number,
        default:null,
      
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
       
    },
    profilepic:{
        type:String,
        default:"",
    },
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
    
    
},{timestamps:true});



module.exports=mongoose.model('User', UserSchema);