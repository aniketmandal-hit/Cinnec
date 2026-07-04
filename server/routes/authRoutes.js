import express from 'express'
import { authUser } from '../middleware/authMiddleware.js'
import { login, logout, register } from '../controllers/authController.js'

export const authRoute = express.Router()

authRoute.post('/register',  register)
authRoute.post('/login', login)
authRoute.post('/logout', authUser, logout)
