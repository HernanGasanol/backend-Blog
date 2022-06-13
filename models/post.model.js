const {model , Schema}=require('mongoose');



const PostSchema=new Schema({
   title:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String,
        trim:true,
       
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
        
    },
    picture:{
        type:String,
        default:""
    },
    hashtags:{
        type:[String],
        default:''
    }

},{timestamps:true});



module.exports=model('Post', PostSchema);