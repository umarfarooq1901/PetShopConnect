const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config({path: './.env'});



// User Signup Controller
const userSignupController = async (req, res) => {
    try {
        const { username, email, password, contact, address } = req.body;

        // Input validation: ensure all fields are present
        if (!username || !email || !password || !contact || !address) {
            return res.status(400).json({ message: 'All Data Fields Are Required!' });
        }

        // Check if the user already exists
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json({ message: 'User Already Registered!' });
        }

        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);
        if (!hashPass) {
            return res.status(500).json({ message: 'Error while hashing the password!' });
        }

        // Create the new user
        const createUser = await User.create({
            username,
            email,
            password: hashPass,
            contact,
            address
        });

        if (createUser) {
            return res.status(201).json({ message: 'User Created Successfully!' });
        } else {
            return res.status(500).json({ message: 'Error while creating the user!' });
        }
    } catch (error) {
        console.error('Error while signing up the user:', error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};


// User Login Controller

const userLoginController = async (req, res) => {
    try {
        const secretKey = process.env.SECRET_KEY;
       const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'All Data Fields Required!'})
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({message: 'User Not Registered yet!'})
        }
        const comparePass = await bcrypt.compare(password, existingUser.password);
        if(!comparePass){
           return res.status(401).json({message: 'Password Incorrect!'})
        }
          // Generate JWT token with expiration
        const createToken = jwt.sign({_id: existingUser._id}, secretKey);
        if(!createToken){
            return res.status(400).json({message: 'Login Token Not Created!'});
        }
     
        //  return res.status(200).json({message: 'Logged in Successfully!', token: createToken});

         // Set the token in an HTTP-only cookie, The token is stored in a cookie instead of being returned in the response body.
        res.cookie('authToken', createToken,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'Strict', // Helps protect against CSRF attacks
               
        });

        return res.status(200).json({message: 'Logged in Successfully!'});

    } catch (error) {
        console.log('Error while logging in:', error);
          return res.status(500).json({message: 'Internal Server Error!'});
    }
};

// User Delete Controller

const userDeleteController = async(req, res)=>{
    try {
            const {_id} = req.params;

            // find the user by id
            const user = await User.findById(_id);
            if(!user){
                return res.status(404).json({message: 'User Not Found!'})
            }

            // delete the user by id
            await User.findByIdAndDelete(_id);
            return res.status(200).json({message: "User Deleted Successfully!"})

        
        
    } catch (error) {
        console.log('Server Error while deleting the user!', error);
        return res.status(500).json({message: 'Internal Server Error!'})
        
    }
}

module.exports = {
  userSignupController,
  userLoginController,
  userDeleteController,
};


module.exports = { userSignupController, userLoginController, userDeleteController };
