import watchlistModel from "../models/watchlistModel.js";

export const searchedWatchlist = async(req, res)=>{
    const targetId = req.query.userId;
    try { 

         const userWatchlist = await watchlistModel.find({userId: targetId})
         if(!userWatchlist){
           return res.json({success: false, message: 'user not found'})
         }
         return res.json({success: true, watchlist: userWatchlist})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}