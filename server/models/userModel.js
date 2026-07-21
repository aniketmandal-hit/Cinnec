import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, default: 'Please enter you bio here'},
    followers: {type: mongoose.Schema.Types.ObjectId, ref:'UserId'},
    following: {type: mongoose.Schema.Types.ObjectId, ref:'UserId'}
})
const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel