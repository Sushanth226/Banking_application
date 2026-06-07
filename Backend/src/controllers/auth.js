const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendEmail } = require("../services/gmail");
const blackListed=require("../models/blackListed");
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
        const htmlContent = `
        <div style="font-family: sans-serif; color: #333; line-height: 1.5;">
            <p>Hello <strong>${name}</strong>,</p>
            <p>Welcome to <strong>Apex Bank</strong>!</p>
            <p>Your account has been successfully registered. You can now log in to view your dashboard, check your balance, and perform transactions.</p>
            <p>Thank you for choosing us.</p>
        </div>`;

        await sendEmail(
            email,
            "Welcome to Apex Bank - Registration Successful",
            `Hi ${name}, Welcome to the backend ledger`,
            htmlContent
        ).catch(console.error);
        return res.status(201).json({
            status: "success",
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


        const htmlContent = `
        <div style="font-family: sans-serif; color: #333; line-height: 1.5;">
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>We noticed a new login to your <strong>Apex Bank</strong> account.</p>
            <p>If this was you, no further action is needed. If you did not authorize this login, please contact our support team immediately.</p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">Time: ${new Date().toLocaleString()}</p>
        </div>`;

        await sendEmail(
            email,
            "New Login to your Apex Bank Account",
            `Hi ${user.name}, Welcome to the backend ledger`,
            htmlContent
        ).catch(console.error);


        return res.status(201).json({
            status: "success",
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

// logout the user

async function logOut(req,res){
    const token=req.cookies.token;
    if(!token){
        return res.status(200).json("Logout successfull");
    }

    const blacklisted=await blackListed.BlackListed.create({
        token:token
    });

    res.clearCookie(token);
    return res.status(200).json("Logout successfull");
   
}

module.exports = { registerUser, loginUser, logOut };