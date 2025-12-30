import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from './User.model.js';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//Route for user login
const loginUser = async (req, res) => {
    try {
        const{ email, password } = req.body;

        //Validation
        if(!email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({msg: "User does not exist"});
        }

        if (user.status === 'inactive') {
            return res.status(403).json({success: false, msg: "Your account is inactive. Please contact support."});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token});
        } else {
            res.status(400).json({success:false, msg: "Invalid credentials"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message:error.message})
    }
}

//Route for user registration
const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        //Validation
        if(!name || !email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }

        //Checking user already exists or not
        const exists = await userModel.findOne({email});

        if (exists){
            return res.json({success:false, message:"User already exists"})
        }

        //Validation email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false , msg: "Please enter a valid email"});
        }
        if(password.length < 8){
            return res.status(400).json({success:false, msg: "Please enter a valid password with min 8 characters"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)
        res.json({success:true, token});

    }catch(error){
        console.log(error);
        res.json({sucess:false, message:error.message})
    }
}

//Route for admin login
const adminlogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.Admin_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token});
        }else{
            res.json({success:false, message:"Invalid admin credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message:error.message})
    }
}

// Get current logged-in user profile
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, msg: 'Unauthorized' });
        }

        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update current logged-in user profile (name, email, phone)
const updateCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, msg: 'Unauthorized' });
        }

        const { name, email, phone } = req.body;

        const update = {};
        if (name !== undefined) update.name = name;
        if (email !== undefined) update.email = email;
        if (phone !== undefined) update.phone = phone;

        const updatedUser = await userModel
            .findByIdAndUpdate(userId, update, { new: true })
            .select('-password');

        if (!updatedUser) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        return res.json({ success: true, user: updatedUser, msg: 'Profile updated' });
    } catch (error) {
        console.log(error);
        // Handle duplicate email or validation errors gracefully
        return res.status(400).json({ success: false, message: error.message });
    }
};

// Change password for current logged-in user
const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, msg: 'Unauthorized' });
        }

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, msg: 'Please provide current and new password' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, msg: 'New password must be at least 8 characters' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.json({ success: true, msg: 'Password updated successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, '-password');
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update user status by admin
const updateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId || !status) {
            return res.status(400).json({ success: false, msg: 'User ID and status required' });
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, { status }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        return res.json({ success: true, user: updatedUser, msg: 'Status updated' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {loginUser, registerUser, adminlogin, getCurrentUser, updateCurrentUser, changePassword, getAllUsers, updateUserStatus};