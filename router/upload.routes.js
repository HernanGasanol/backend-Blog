const router=require('express').Router();
const { uploadController, deleteController } = require('../controllers/upload.controllers');

const  {validateJWT}=require('../middlewares/validateJWT')






router.post('/', uploadController )

router.delete('/:imageId', deleteController )

module.exports=router;