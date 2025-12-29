import express from 'express';
import { loginUser, registerUser, adminlogin, getCurrentUser, updateCurrentUser, changePassword } from './User.controller.js';
import auth from '../../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminlogin);

// Authenticated user profile routes
userRouter.get('/me', auth, getCurrentUser);
userRouter.put('/me', auth, updateCurrentUser);
userRouter.put('/password', auth, changePassword);

export default userRouter;