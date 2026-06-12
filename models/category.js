import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    cname : {type : String},
    cdescription : {type : String},
    cimage : {type : String},
    cstatus : {type : Boolean, default : true},
    subCategories :[{
        name : {type : String},
        description : {type : String},
        image : {type : String, default : null},
        status : {type : Boolean, default : true}
    }]
},{timestamps : true});

export const categories = mongoose.model("Category", categorySchema);