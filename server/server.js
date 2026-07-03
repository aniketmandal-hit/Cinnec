import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()

connectDb()
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send('hello world')
})


app.listen(4000, () => {
    console.log('Server is working on port 4000')
})
