const router=require('express').Router();
const {getUser, getUsers, updateUser, deleteUser} = require('../controllers/user.controllers')
const  {validateJWT}=require('../middlewares/validateJWT')




router.get('/', getUsers )

router.get('/:id', getUser )

router.put('/:id',validateJWT, updateUser )

router.delete('/:id',validateJWT, deleteUser )


module.exports=router;