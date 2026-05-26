import { brands } from "../models/brand.js";
import { uploadImage } from "../middleware/brandMulter.js";


// Create a New Brand
export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (req.file) {
      const result = await uploadImage(req.file);
      
      if (!result.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      const brand = new brands({
        name,
        description,
        logo: result.secure_url,
      });
      const brandData = await brand.save();
        return res.status(201).json({
        message: "Brand Create successfully",
        data: brandData,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Getall Brands getAllBrand 
export const getAllBrand = async(req, res) => {
    try{

        const page =parseInt(req.query.page) || 1;
        const limit =parseInt(req.query.limit) ||10;
    
        const skip = (page -1) * limit;

        const totalBrands = await brands.countDocuments();
    
        const brand = await brands.find()
        .skip().limit(limit).sort({ _id: -1 });

        return res.status(201).json({ Message: "Get All Brand",
            currentPage:page,
             totalPages: Math.ceil(totalBrands / limit),
             totalBrands,
             limit,
             brand})
    }catch(error){
        res.status(500).json({Message: "Server Error"});
    }
}
