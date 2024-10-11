const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config({ path: "./.env" });

// User Signup Controller
const userSignupController = async (req, res) => {
  try {
    const { username, email, password, contact, address, role } = req.body;

    // Input validation: ensure all fields are present
    if (!username || !email || !password || !contact || !address) {
      return res.status(400).json({ message: "All Data Fields Are Required!" });
    }

    // Check if the user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json({ message: "User Already Registered!" });
    }

    let userRole = role || "customer"; //Default to customer

    //Ensure no one can signup as an admin directly
    if (userRole === "admin") {
      return res
        .status(403)
        .json({ message: "Admin registration not allowed! " });
    }
        // Validate password strength (optional)
        // if (password.length < 6) {
        //   return res
        //     .status(400)
        //     .json({ message: "Password must be at least 6 characters long!" });
        // }

    // Hash the password
    const hashPass = await bcrypt.hash(password, 10);

    // Create the new user
    const createUser = await User.create({
      username,
      email,
      password: hashPass,
      contact,
      address,
      role: userRole, //assign role
    });

    if (createUser) {
      return res.status(201).json({ message: "User Created Successfully!" });
    } else {
      return res
        .status(500)
        .json({ message: "Error while creating the user!" });
    }
  } catch (error) {
    console.error("Error while signing up the user:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// User Login Controller

const userLoginController = async (req, res) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const { email, password } = req.body; // Accept role during login
    if (!email || !password) {
      return res.status(400).json({ message: "All Data Fields Required!" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User Not Registered yet!" });
    }
    // Check if the user is trying to log in with the correct role
    // Ensure the user has the correct role (customer, petShop, or admin)
    // if (role && existingUser.role !== role) {
    //   return res.status(403).json({
    //     message: `Unauthorized: ${role} login is not allowed for this account!`,
    //   });
    // }
    const comparePass = await bcrypt.compare(password, existingUser.password);
    if (!comparePass) {
      return res.status(401).json({ message: "Password Incorrect!" });
    }
    // Generate JWT token with expiration
    const createToken = jwt.sign({ _id: existingUser._id, role: existingUser.role }, secretKey,   { expiresIn: "7d" } ); // Token expires in 7 days 
    if (!createToken) {
      return res.status(400).json({ message: "Login Token Not Created!" });
    }

    //  return res.status(200).json({message: 'Logged in Successfully!', token: createToken});

    // Set the token in an HTTP-only cookie, The token is stored in a cookie instead of being returned in the response body.

      // Set the token in a cookie based on the user's role
      if (existingUser.role === 'petshop') {
        res.cookie("petshopToken", createToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "Strict",
        });
      } else {
        res.cookie("authToken", createToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "Strict",
        });
      }


    return res
      .status(200)
      .json({ message: "Login Successfully!", userId: existingUser._id, role: existingUser.role, createToken });
  } catch (error) {
    console.log("Error while logging in:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// User Delete Controller

const userDeleteController = async (req, res) => {
  try {
    const { _id } = req.user; // Get the user ID from the authenticated user

    // Check if the user exists
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    // Delete the user account
    await User.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ message: "Your account has been deleted successfully!" });
  } catch (error) {
    console.log("Server Error while deleting the user!", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// User Edit Controller

const userEditController = async (req, res) => {
  try {
    const { username, password, contact, address } = req.body;
    const _id = req.user._id; // Assume req.user contains the decoded user object

    if (!_id) {
      return res.status(403).json({ message: "ID Not Passed!" });
    }

    const findUser = await User.findById(_id);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    // Hash password only if it's provided in the update
    let hashPass;
    if (password) {
      hashPass = await bcrypt.hash(password, 10);
      if (!hashPass) {
        return res
          .status(500)
          .json({ message: "Error while hashing the new password!" });
      }
    }

    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        // Fallback Logic: Here, I used username || findUser.username, which means if username is not provided (undefined), it will retain the existing value from findUser.username. This prevents overwriting existing fields with undefined.
        username: username || findUser.username, // Use existing value if not provided
        password: hashPass || findUser.password, // Update password only if a new one is provided
        contact: contact || findUser.contact,
        address: address || findUser.address,
      },
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updateUser) {
      return res
        .status(500)
        .json({ message: "Error while updating user details!" });
    }

    return res
      .status(200)
      .json({ message: "User Details Updated Successfully!" });
  } catch (error) {
    console.log("Error while updating details", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};



module.exports = {
  userSignupController,
  userLoginController,
  userDeleteController,
  userEditController,
};
