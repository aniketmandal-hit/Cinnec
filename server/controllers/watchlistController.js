import userModel from "../models/userModel.js";
import watchlistModel from "../models/watchlistModel.js";

export const watchlist = async (req, res)=>{
    const userId = req.user
    const {mediaTitle, mediaName, mediaId, mediaType, posterPath, status} = req.body

    if(!userId){
        return res.json({success: false, message: 'Something went wrong'})
    }
    try {
        const watchlistItems = new watchlistModel({
            userId,
            mediaTitle,
            mediaName,
            mediaId,
            posterPath,
            status
        })
        await watchlistItems.save()
        return res.json({success: true, message: 'Added to your watchlist'})
    } catch (error) {
        if(error.code === 11000){
        return res.json({success: false, message: 'Already in your watchlist'})
        }
        return res.json({success: false, message: error.message})
    }
}
export const deleteWatchlistItem = async(req, res)=>{
    const userId = req.user
    const {mediaId} = req.body

    try {
        const deleteItem = await watchlistModel.findOneAndDelete({userId, mediaId})
        if(!deleteItem){
            return res.json({status: false, message: 'Item not found in watchlist'})
        }
        return res.json({success: true,message: 'item delete successful',  deleteItem})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}