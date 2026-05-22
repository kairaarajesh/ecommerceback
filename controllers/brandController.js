import {Brands} from "../models/brand.js";
import {uploadImage} from "../middleware/brandMulter.js";


export const createBrand = async (req , res) => {
    try {
        
           const {name, description } = req.body;

           if (req.file) {
            const result = await uploadImage(req.file.path);
            logoUrl = result.secure_url;
           }

            const newBrand = new Brands({name, description,logo: logoUrl});

           await newBrand.save();
           res.status(201).json({message : "Brand Create successfully", newBrand});
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }

}
    