import express from 'express';
import bcrypt from 'bcryptjs';
import { auth, adminAuth } from '../middleware/auth.js';
import User from '../models/User.js';
import Group from '../models/Group.js';
import GroupUser from '../models/GroupUser.js';

const router = express.Router();

router.post("/create-user", auth, adminAuth, async(req,res)=>{
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name, email, password: hashedPassword
    })
    await user.save();
    res.json({message: "User created"});
});

router.post("/create-group", auth,adminAuth, async(req,res)=>{
    const group = new Group({
        name: req.body.name,
        createdBy: req.user.userId
    })
    await group.save();
    res.json({message: "Group created"});
});

router.post("/add-user-to-group", auth, adminAuth, async(req,res)=>{
    const {userId, groupId} = req.body;
    const exists = await GroupUser.findOne({userId, groupId});
    if(exists){
        return res.status(400).json({message: "User already added"});
    }
    await GroupUser.create({userId, groupId});
    res.json({message: "User added to group"});
});

router.get("/users", auth, adminAuth, async(req,res)=>{
    const users = await User.find(
    { role: { $ne: "admin" } }, "name email")
    res.json(users)
});

router.get("/groups", auth, adminAuth, async(req,res)=>{
    const groups = await Group.find();
    res.json(groups);
});

export default router;