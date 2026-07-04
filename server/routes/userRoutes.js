import express from 'express'
import { authUser } from '../middleware/authMiddleware.js'
import { getUserDetails } from '../controllers/userController.js'

export const userRoute = express.Router()

userRoute.get('/', authUser, getUserDetails)