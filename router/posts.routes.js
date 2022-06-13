const router=require('express').Router();
const {validateJWT}=require('../middlewares/validateJWT')
const {createPost, getPosts , getPost, updatePost, deletePost} = require('../controllers/posts.controllers')




//crear nota
router.post('/',validateJWT, createPost )

//obtener notas
router.get('/', getPosts )

//obtener nota por id
router.get('/:id', getPost )

//actualizar nota 
router.put('/:id',validateJWT,updatePost )


//borrar nota
router.delete('/:id',validateJWT, deletePost )



module.exports=router;