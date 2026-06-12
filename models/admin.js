// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({

//     name : {type : String, required : true},
//     email : {type: String, required : true, unique : true},
//     password : {type : String, required : true},
//     role : {type : String, default : "admin", enum : ["admin", "superadmin"]},
//     status : {type : String, default : "active", enum : ["active", "inactive"]},
//     permissions : {type : Object , default : {}},
    
// },{timestamps : true})

// export const Admin = mongoose.model("admin", adminSchema)