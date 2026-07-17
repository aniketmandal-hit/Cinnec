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
export const updateUser = async (req, res) => {
    const userId = req.user;
    const {newName} = req.body;
    const {newBio} = req.body;

    if(!userId){
        return res.json({sucess: false, message: 'Please login '})
    }

    if (!newName || newName.trim().length === 0) {
        return res.json({ success: false, message: 'Please enter a valid name' });
    }
    if(newBio.length > 300){
        return res.json({success: false, message: `Length of bio should not exceed 300 letters, current length ${newBio.length}`})
    }
    try {
        const getNewDetails = await userModel.findByIdAndUpdate(userId, {name: newName, bio: newBio}, {returnDocument: 'after'})
        if(!getNewDetails){
            return res.json({success: false, message: 'User not found'})
        }
        
        return res.json({success: true, message: 'Details changed successfuly', name: getNewDetails.name, bio: getNewDetails.bio})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const searchUser = async (req, res) => {
    const {username} = req.query

    try {
         const users = await userModel.find({username: {$regex: username.trim(), $options: 'i'}}).select('username')
    if(!users){
        return res.json({success: false, message: 'No user found with this username'})
    }
   return res.json({success: true, users})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
   
}