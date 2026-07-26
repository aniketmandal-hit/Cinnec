import express from 'express'
import { authUser } from '../middleware/authMiddleware.js'
import { getUserDetails, searchUser, updateUser } from '../controllers/userController.js'
import { followControl } from '../controllers/followControllers.js'

export const userRoute = express.Router()

userRoute.get('/', authUser, getUserDetails)
userRoute.post('/update-details', authUser, updateUser)
userRoute.get('/search', searchUser)
userRoute.post('/follow', authUser, followControl)