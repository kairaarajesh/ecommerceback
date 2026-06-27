import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
{
    name : {type :String, required:true},
    email :{ type :String, required : true},
    password: { type: String, required: true },
    googleId: { type: String,  default: null,unique: true,sparse: true},
    role: {
      type: String,
      default: "user",
    },

},{ timestamps: true }
);

userSchema.methods.getJwtToken = function (){
    return jwt.sign({id :this._id}, process.env.JWT_SECRET_KEY)
}

export const User = mongoose.model("User", userSchema)