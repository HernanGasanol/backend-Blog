const jwt=require('jsonwebtoken')

const validateJWT=async( req, res, next)=>{
  const Authorization =  req.header("Authorization");
  const Bearer=Authorization.split(' ')[1];


  try{   
     !Bearer && res.status(400).json({ok:false, msg:'se requiere un token'})

      const validateToken =  jwt.verify(Bearer,process.env.JWT_SIGN)

      !validateToken && res.status(400).json({ok:false, msg:'token inválido'})

      const {id,email} = validateToken
     
      req.uid=id,
      req.email=email

     next()
  }catch(e){
       return res.status(500).json({ok:false , msg:'internal error'})
  }
}





module.exports={
    validateJWT
}