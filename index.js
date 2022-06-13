const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const multer  = require('multer');
const {db_connect}=require('./db.js');
const cors=require('cors');
const { validateJWT } = require('./middlewares/validateJWT.js');
const {  v4 } = require('uuid');
const fs=require('fs-extra');


// intializations
const app=express();
dotenv.config()


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/public", express.static(path.join(__dirname, "/public")));




// app.set('views', path.join(__dirname, '/public'));

app.use(cors())

//db
db_connect().then(()=> console.log('conexion exitosa'))

// settings
app.set('port', process.env.PORT || 4000)



//multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,path.join(__dirname,'public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${v4()}${path.extname(file.originalname)}`);
    },
  });
  
app.use(multer({ storage: storage }).single('file'))

  // const upload = multer({ storage: storage });
 

  




//routes
app.use('/api/auth',require('./router/auth.routes'));
app.use('/api/users',require('./router/user.routes'));
app.use('/api/posts',require('./router/posts.routes'));
app.use('/api/upload',require('./router/upload.routes'))
//statics
app.use(express.static(path.join(__dirname, 'public')));


// Global variables



//start
app.listen(app.get('port'), () => console.log('servidor escuchando'));