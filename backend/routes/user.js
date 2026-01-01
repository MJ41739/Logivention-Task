import express from 'express';
import {auth} from '../middleware/auth.js';
import User from '../models/User.js';
import Group from '../models/Group.js';
import GroupUser from '../models/GroupUser.js';

const router = express.Router();

router.get("/my-groups", auth, async(req,res)=>{
    const mapping = await GroupUser.find({userId: req.user.userId});
    const groupIds = mapping.map(m=> m.groupId);
    const groups = await Group.find({_id: { $in: groupIds }});
    
    const result = [];
    for (let group of groups){
        const usersMapping = await GroupUser.find({groupId: group._id});
        const userIds = usersMapping.map(m=> m.userId);
        const users = await User.find({_id:{$in: userIds}}, 'name email');
        result.push({
            groupId: group._id,
            groupName: group.name,
            membersCount: users.length,
            members:users
        });
    }
    res.json(result);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.userId, "name email")
  res.json(user)
})

export default router;