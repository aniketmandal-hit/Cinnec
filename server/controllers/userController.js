import userModel from "../models/userModel.js";

export const getUserDetails = async(req, res)=>{
    const userId = req.user;

    try {
        const user = await userModel.findById(userId).select('-password')
        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }
        return res.json({success: true, user})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}