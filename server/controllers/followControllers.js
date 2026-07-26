import userModel from "../models/userModel.js";

export const followControl = async(req, res)=>{
    const userId = req.user
    const {targetId} = req.query

    if(!userId){
        return res.json({success: false, message: 'User not found'})
    }

    if(userId == targetId){
        return res.json({success: false, message: 'You cannot follow your self'})
    }
    
    try {
    const currentUser = await userModel.findById(userId)
    const targetUser  = await userModel.findById(targetId)

    if (!targetUser) {
        return res.json({success: false, message: 'Target user not found'})
    }
   const isFollowing = (currentUser.following || []).includes(targetId);

    if (isFollowing) {
        await userModel.findByIdAndDelete(userId, {$pull: {following: targetId}})
        await userModel.findByIdAndDelete(targetId, {$pull: {followers: userId}})

        return res.json({success: true, message:"Unfollowing succcessful "})
    } else {
        await userModel.findByIdAndUpdate(userId, {$addToSet: {following: targetId}})
        await userModel.findByIdAndUpdate(targetId, {$addToSet: {following: userId}})

        return res.json({success: true, message: `started following ${targetId.name}`})
    }
    

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
   

}