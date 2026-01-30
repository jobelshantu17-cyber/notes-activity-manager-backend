//Import User model
const User = require('../models/userModel.js')

//Import bcrypt
const bcrypt = require('bcrypt')

//Register user controller
const registerUser = async (req, res) => {
    try{
        //1. Get name, email, password, from request
        const { name, email, password } = req.body;

        //2. validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        //3. check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }

        //4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //5. Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //6. Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    }catch(err){
        res.status(500).json({ message: "Server error" })

    }
}



//Login user controller
const { generateAccessToken } = require("../utils/token.js")

const loginUser = async (req, res) => {
    try{
        //Get email and password
        const { email, password } = req.body;

        //Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        //Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //Generate access token
        const accessToken = generateAccessToken(user._id);

        //Send response
        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

 }catch(err){
    res.status(500).json({ message: "Server error" })
     }
} 

//Export
module.exports = { registerUser, loginUser }









