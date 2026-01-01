import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET);
    res.json({token, role:user.role});
})

export default router;