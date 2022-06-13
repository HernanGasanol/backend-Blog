const router=require('express').Router();
const { check } = require('express-validator');
const {fieldsValidate} = require('../middlewares/feldsvalidate');

const {login, register} = require('../controllers/auth.controllers')

router.post('/register', register)

router.post('/login',[
    check('email' , 'debe proveer un email' ).not().isEmpty().isEmail(),
    check('password' , 'debe proveer una contraseña de almenos 6 caracteres' ).not().isEmpty().isLength({min:6}),
    fieldsValidate
], login)


module.exports=router;