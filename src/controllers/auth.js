const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendEmail } = require("../services/gmail");
// Register a new user (controller function)
async function registerUser(req, res) {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ message: "email,name and password are required" });
        }
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json(
                {
                    message: "user already exists",
                    status: "failed"
                });
        }
        const user = await User.create({ email, password, name });
        
        const token = jwt.sign(
            { user_Id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token);
        await sendEmail(
            email,
            "Welcome to the Bankend Ledger(register)",
            `Hi,${name} to the bankend ledger`,
            `
            <h1>Simple html test</h1>
            <p>para</p>
            `
        ).catch(console.error);
        return res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                username: user.name
            },
            token
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Login a user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required",
                status: "failed"
            }
            );
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "invalid credentials",
                status: "failed"
            });
        }
        
        const token = jwt.sign(
            { user_Id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token);


        sendEmail(
            email,
            "Welcome to the Bankend Ledger(Login)",
            `Hi,${user.name} to the bankend ledger`,
            `
            <h1>Simple html test<h1>
            <p>para<p>
            `
        ).catch(console.error);


        return res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                username: user.name
            },
            token
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { registerUser, loginUser };