import express from 'express';
import { loginUser, registerUser, adminlogin, getCurrentUser, updateCurrentUser, changePassword, getAllUsers, updateUserStatus } from './User.controller.js';
import auth from '../../middleware/auth.js';
import adminAuth from '../../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminlogin);

// Authenticated user profile routes
userRouter.get('/me', auth, getCurrentUser);
userRouter.put('/me', auth, updateCurrentUser);
userRouter.put('/password', auth, changePassword);
// Admin: Get all users
userRouter.get('/all', adminAuth, getAllUsers);
// Admin: Update user status
userRouter.put('/status', adminAuth, updateUserStatus);

export default userRouter;
