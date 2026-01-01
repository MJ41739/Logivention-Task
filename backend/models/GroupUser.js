import mongoose from "mongoose";

const groupUserSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    groupId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

export default mongoose.model('GroupUser', groupUserSchema);