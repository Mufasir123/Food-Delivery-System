import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
            })
            .json({
                success: true,
                message: `Welcome back ${user.name || user.email}`,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user._id
                },
                token
            });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error",
        });
    }
};

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await UserModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res
            .status(201)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
            })
            .json({
                message: `Welcome ${user.name || user.email}`,
                user,
                success: true,
            });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error",
        });
    }
};

// Logout User
export const Logout = (req, res) => {
    return res
        .cookie("token", "", { expiresIn: new Date(Date.now()) })
        .json({
            message: "User logged out successfully.",
            success: true,
        });
};

// Get User Profile
export const getMyProfile = async (req, res) => {
    try {
        // Middleware se `req.user` me user data already hai
        const user = req.user;

        return res.status(200).json({
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};
