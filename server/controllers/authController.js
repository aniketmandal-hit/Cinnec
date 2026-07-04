import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
 
    //yaha register krega user
export const register = async(req, res)=>{
    const {name, username, email, password} = req.body
    
    if(!name || !username || !email || !password){
       return res.json({success: false, message: 'All field are required'})
    }
    if(username.length > 15 ){
        return res.json({success: false, message: 'Username must not exceed 15 letters'})
    }
     if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
        return res.json({success: false, message: "Username can only contain alphabets, numbers, underscore (_), and dot (.)"})
    }

    try {
        const existUser = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        });
        if(existUser){
            res.json({success: false, message: 'Username or email already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const user = new userModel({name, username, email, password: hashedPassword})
         await user.save()

         //token & cookies part
        //token
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'})
        
         //cookies
         res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
         })
        return res.json({success: true, message: 'Registration successful'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

    //ye login ke liye h

  export  const login = async(req, res)=>{
        const {email, password} = req.body;
        if(!email || !password){
        return res.json({success: false, message: 'Email & password are required'})
        }
        try {
            const user = await userModel.findOne({email})
            if(!user){
                return res.json({success: false, message: 'Email not found'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.json({success: false, message: 'Wrong password'})
            }

            //token part
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'})
        
         //cookies part
         res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
         })

        return res.json({success: true, message: 'Logged in successfully'})

        } catch (error) {
            return res.json({success: false, message: error.message})
        }
        
    }
    //logout 
    export const logout = async (req, res) => {
        //cookie clear krna hoga logout krwane ke liye
        try {
            res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
            })

           return res.json({success: true, message: 'Logged out successfully'})

        } catch (error) {
           return res.json({success: false, message: error.message})
        }
    }