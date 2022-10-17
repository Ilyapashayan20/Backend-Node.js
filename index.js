import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import multer from "multer";
import { registerValidation,loginValidation, postCreateValidation } from './validations/validations.js'
import checkAuth from './utils/checkAuth.js'
import {register, login, getMe} from './controllers/UserController.js'
import * as  PostController from './controllers/PostController.js'
import handleValidationErrors from "./utils/handleValidationErrors.js";

dotenv.config();

mongoose.connect(process.env.ADMIN_ID)
.then(()=>console.log('DB Connected:'))
.catch((err)=> console.log('DB Error', err))

const app = express();

const storage = multer.diskStorage({
    destination:(_,__, cb)=>{
        cb(null,'uploads');
    },
    filename:(_,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.get('/', (req,res)=>{
    res.send('Hello Express App!!')
})
app.post('/auth/login',loginValidation,handleValidationErrors,login)
app.post('/auth/register',registerValidation, handleValidationErrors ,register)
app.get('/auth/me',checkAuth,getMe)

app.post('/upload', checkAuth, upload.single('image'), (req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts',PostController.getAll)
app.get('/posts/:id',PostController.getOne)
app.post('/posts' ,checkAuth,postCreateValidation,handleValidationErrors, PostController.create)
app.delete('/posts/:id',checkAuth,PostController.remove)
app.patch('/posts/:id',checkAuth,postCreateValidation,handleValidationErrors,PostController.update)



app.listen(process.env.PORT, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server Connected:');
})
