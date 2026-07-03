import watchlistModel from "../models/watchlistModel.js";

export const watchlist = async (req, res)=>{
    const userId = req.user
    const {mediaId, mediaType, posterPath, status} = req.body

    if(!userId){
        return res.json({success: false, message: 'Something went wrong'})
    }
    try {
        const watchlistItems = new watchlistModel({
            userId,
            mediaId,
            mediaType,
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