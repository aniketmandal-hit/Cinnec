import express from 'express';
import { authUser } from '../middleware/authMiddleware.js';
import { deleteWatchlistItem, watchlist } from '../controllers/watchlistController.js';
import { getUserWatchlist } from '../controllers/getWatchlistController.js';
import { updateWatchlistStatus } from '../controllers/updateStautusController.js';

export const watchlistRoute = express.Router()

watchlistRoute.post('/add', authUser, watchlist)
watchlistRoute.get('/get', authUser, getUserWatchlist)
watchlistRoute.post('/update-status', authUser, updateWatchlistStatus)
watchlistRoute.post('/delete', authUser, deleteWatchlistItem)

