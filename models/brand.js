import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String},
    logo : {type : String}
},{timestamps : true})

export const brands = mongoose.model("brand", brandSchema)

// module.exports = mongoose.model("Brands", brandSchema);