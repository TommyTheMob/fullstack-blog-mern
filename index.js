import express from 'express'
import mongoose from "mongoose"
import multer from "multer"
import cors from 'cors'

import { config } from 'dotenv';

import {registerValidation, loginValidation, postCreateValidation, commentCreateValidation} from './validations.js'

import {UserController, PostController, CommentController} from "./controllers/index.js"

import {handleValidationErrors, checkAuth} from "./utils/index.js";

config()

const dbConnect = process.env.DATABASE_CONNECT_LINK

mongoose.connect(dbConnect)
    .then(() => console.log('Database OK'))
    .catch((err) => console.log('DB Error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.get('/comments/:postId', CommentController.getPostComments)
app.get('/comments', CommentController.getLastComments)
app.post('/comments/:postId', checkAuth, commentCreateValidation, CommentController.create)
app.delete('/comments/:commentId', checkAuth, CommentController.remove)
app.patch('/comments/:commentId', checkAuth, commentCreateValidation, CommentController. update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})