import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    try {
        // Check if Authorization header is present
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Authorization Header:', req.header('Authorization')); // Log the header
        console.log('Extracted Token:', token);
        if (!token) {
            console.log("No token found in request");
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // Find user using decoded userId
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            console.log("User not found");
            throw new Error();
        }

        // Attach token and user to the request object
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in authMiddleware:", error);
        res.status(401).json({ error: 'Please authenticate' });
    }
};

export default authMiddleware;
