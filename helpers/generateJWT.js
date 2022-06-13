const jwt=require('jsonwebtoken')


 const generateJWT=async(id,email)=> {
    const payload={
        id,
       email
    }

    try{
        const token =await jwt.sign(payload,process.env.JWT_SIGN,{expiresIn:'7d'})
        return token
    }catch(e){
        console.log(e)
    }

    

}


module.exports={
    generateJWT
}