import {User} from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req,res) =>{

    try{

        const {name, email ,password , googleId, role }=req.body;
        console.log("==",password)

        const hashPassword = await bcrypt.hash(password, 10);


        const users = new User({
            name, email ,password , googleId, role
        });

        const userData = await users.save();
        
        const adminResponse = userData.toObject();
        delete adminResponse.password;

        return res.status(201).json({
            message: "Admin Create successfully",
            data: adminResponse,
        });
    } 
    catch (error) {
        console.log("===",error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const loginUser = async (req, res) => {

    try{
        const { email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "User or password invalid"
            });
        }

        const MatchPassword = await bcrypt.compare(password, user.password)
        if(!MatchPassword){
          return res.status(404).json({Message : "Admin or Password invalid"})
        };

           const token = user.getJwtToken();

          const userResponse = User.toObject();
           delete userResponse.password;

           return res.status(200).cookie("token" , token,{
            expire  :new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000   //  3 days
            ),
            httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict",
           }).json({
          message: "Login successful",
            data: userResponse,
            token
           })
    }
    catch (error) { 
        console.log("===",error)
    res.status(500).json({ message: "Server Error" });
   }  
}