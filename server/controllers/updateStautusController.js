import watchlistModel from "../models/watchlistModel.js";


export const updateWatchlistStatus = async(req, res)=>{
    const userId = req.user;
    const {mediaId, status} = req.body

    try {
        const updateStatus = await watchlistModel.findOneAndUpdate({userId,mediaId}, {status}, {new: true})
            
        if (!updateStatus) {
            return res.json({success: false, message: 'Item not found in your watchlist'})
        }
        return res.json({success: true, message: 'Status successfully updated'})
    } catch (error) {
        return res.json({success: true, message: error.message})
    }
}

