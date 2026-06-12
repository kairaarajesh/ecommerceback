import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
    stateName : {type : String, required : true},
    taxPrice : {type : Number, required : true},
    taxStatus : {type : Boolean, default : true}
},{timestamps : true});
    
export const tax = mongoose.model("Tax", taxSchema);
