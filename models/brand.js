import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    name : {type : String},
    description : {type : String, required : false},
    logo : {type : String, required: true}
},{timestamps : true})

export const Brands = mongoose.model("brand", brandSchema)