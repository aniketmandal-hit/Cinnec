import mongoose from "mongoose";

const WatchlishSchema = new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
            },
    mediaTitle:{
            type: String,
            },
             mediaTitle:{
            type: String,
            },    
    mediaId:{
             type: String,
             required: true
            },
    posterPath: {
            type: String,
            required: true
            },
    status: {
            type: String,
            default: 'Plan to Watch',
            enum: ['Plan to Watch', 'Watching', 'Completed', 'Dropped', 'On Hold']
            },
        
},
    {timestamps: true}
)
    WatchlishSchema.index({userId: 1,mediaId: 1,mediaType: 1}, {unique: true});
    
    const watchlistModel = mongoose.models.watchlist || mongoose.model('watchlist', WatchlishSchema)
    export default watchlistModel