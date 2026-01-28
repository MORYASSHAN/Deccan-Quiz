
import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from "validator";//validate email from database 
import bcrypt from "bcryptjs";//hash the passsword hepl to secure it
import jwt from "jsonwebtoken";//give token once login then no need to login

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";//make the secrete key

// REGISTER
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const existingUser = await User.findOne({ email }).lean();//find one find that emali and lean return full mongoose doccs
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);//hash the password into a 10 word

    const user = new User({ _id: newId, name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: newId.toString() }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });//gives a token that will expir in  24 hr

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("register error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("login error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
