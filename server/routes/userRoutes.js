import express from 'express'
import { authUser } from '../middleware/authMiddleware.js'
import { getUserDetails, updateUser } from '../controllers/userController.js'

export const userRoute = express.Router()

userRoute.get('/', authUser, getUserDetails)
userRoute.post('/update-details', authUser, updateUser)