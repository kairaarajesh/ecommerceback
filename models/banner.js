import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name: { type: string},
    description : {type: string,},
    image : { type : string}
    
},{timestamps : true});

export const banners = mongoose.model("banners",bannerSchema)
