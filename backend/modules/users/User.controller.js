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

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token});
        }else{
            res.status(400).json({success:false, msg: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message:error.message})
    }
}

//Route for user registration
const registerUser = async (req, res) => {
    // To see if the route is working
    //res.json({msg: "Register API working"})

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
    // Implementation for admin login
}

export {loginUser, registerUser, adminlogin};