import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {authRoute} from './routes/authRoutes.js'
import {userRoute} from './routes/userRoutes.js'
import {watchlistRoute} from './routes/watchlistRoutes.js'


dotenv.config()
const app = express()

connectDb()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/watchlist', watchlistRoute)


app.get('/', (req, res)=>{
    res.send('hello world')
})



app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})
