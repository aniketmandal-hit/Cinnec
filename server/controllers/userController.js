import userModel from "../models/userModel.js";
 
    //yaha register krega user
export const register = async(req, res)=>{
    const {username, email, password} = req.body
    
    if(!username || !email || !password){
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
            res.json({success: false, message: 'Username or password already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const user = new userModel({username, email, password = hashedPassword})
         await user.save()

    } catch (error) {
        
    }

}