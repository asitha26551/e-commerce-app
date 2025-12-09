import express from 'express';
import { loginUser, registerUser, adminlogin } from './User.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/adminlogin', adminlogin);

export default userRouter;