import {banners} from "../models/banner";
import { uploadImage } from "../middleware/brandMulter.js";


export const createBanner = async(req,res)=>{

    try{
        const {name, description } = req.body;

        // const existingBanner = await banner.findOnd({name})
        // if(existingBanner){
        //     return res.status(400).json({ message: "Email already exists" });
        // }
         if (req.file) {
      const result = await uploadImage(req.file);
      
      if (!result.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

        const banner = await banners({
            name,description,
            image : secure_url,
        });

        const brandData = await brand.save();
        return res.status(201).json({
        message: "Brand Create successfully",
        data: brandData,
        });
    }
}catch(error){
         res.status(500).json({ message: "Server Error" });
    }
}
