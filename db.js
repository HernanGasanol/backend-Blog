const mongoose=require('mongoose')
const  db_connect=async()=>{
    return await mongoose.connect(process.env.DB_URI)
}


module.exports={
    db_connect
}

