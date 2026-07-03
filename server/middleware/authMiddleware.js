import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    const token  = req.cookies.token
    if(!token){
        res.json({success: false, message: 'Please login again'})
    }
    try {
      const tokenVerify = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
      req.user = tokenVerify.id

      next()
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
    
}