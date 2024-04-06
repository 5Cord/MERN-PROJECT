import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from "./utils/checkAuth.js"

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.seeii9x.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.post('/login', loginValidation, UserController.login)
app.post('/register', registerValidation, UserController.register)
app.get('/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server ok')
});