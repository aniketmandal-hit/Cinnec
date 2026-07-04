import watchlistModel from "../models/watchlistModel.js";

export const getUserWatchlist = async(req, res)=>{
    const userId = req.user;

    try {
        const userWatchlist = await watchlistModel.find({userId}).sort({createdAt: -1})
        return res.json({success: true, userWatchlist})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}