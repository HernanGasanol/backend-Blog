const fs=require('fs-extra')
const path=require('path')
const cloudinary=require('cloudinary')

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
})


 const uploadController=async(req,res)=>{
  

    try{

    const filename=req.file.filename;


    const image=await cloudinary.v2.uploader.upload(req.file.path)      
 
      await fs.remove(`public/uploads/${filename}`)
      
       return res.status(201).json({ok:true, msg:'successful creation', image});

     }catch(e){
        console.log(e)
        return res.status(500).json({
         ok: false,
         msg: "internal error",
         
      
      });
     }
      
}
const deleteController=async(req,res)=>{
  

   try{
      const image=req.params.imageId

      
      const deletedImage=await cloudinary.v2.uploader.destroy(image) 

     
     return res.status(200).json({ok:true, msg:'deleted image'});

    }catch(e){
       console.log(e)
       return res.status(500).json({
        ok: false,
        msg: "internal error",
        
     
     });
    }
     
}







module.exports = {
        uploadController,
        deleteController
  };
  