import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({

    name : {type : String, required : true},
    email : {type: String, required : true, unique : true},
    password : {type : String, required : true},
    role : {type : String, default : "admin", enum : ["admin", "superadmin"]},
    status : {type : String, default : "active", enum : ["active", "inactive"]},
    permissions : {type : Object , default : {}},
    
},{timestamps : true});

adminSchema.methods.getJwtToken = function (){
    return jwt.sign({id :this._id}, process.env.JWT_SECRET_KEY)
}
export const Admin = mongoose.model("admin", adminSchema)