import userModel from "../models/userModel.js";

export const followControl = async(req, res)=>{
    const currentId = req.user._id
    const targetId = req.query


    if(currentId == targetId){
        return res.json({success: false, message: 'You cannot follow your self'})
    }
    
    try {
    const currentUser = await userModel.findById(currentId)
    const targetUser  = await userModel.findById(targetId)

    if (!targetUser) {
        return res.json({success: false, message: 'User not found'})
    }
    const isFollowing = userModel.following.include(targetId)

    if (isFollowing) {
        await userModel.findByIdAndDelete(currentId, {$pull: {following: targetId}})
        await userModel.findByIdAndDelete(targetId, {$pull: {followers: currentId}})
    } else {
        await userModel.findByIdAndUpdate(currentId, {$addToSet: {following: targetId}})
        await userModel.findByIdAndUpdate(targetId, {$addToSet: {following: currentId}})
    }
    

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
   

}