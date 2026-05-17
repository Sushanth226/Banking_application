const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        // token verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.user_Id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};

module.exports = authMiddleware;