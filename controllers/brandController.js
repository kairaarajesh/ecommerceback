import { brands } from "../models/brand.js";
import { uploadImage } from "../middleware/brandMulter.js";


// Create a New Brand
export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (req.file) {
      const result = await uploadImage(req.file);
      
      if (!result.secure_url) {
        throw new Error("Image upload failed");
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
        const limit = 10;
    
        const skip = (page -1) * limit;

        const totalBrands = await brands.countDocuments();
    
        const brand = await brands.find()
        .skip(skip).limit(limit).sort({ _id: -1 });

        return res.status(200).json({ Message: "Get All Brand",
             currentPage:page,
             totalPages: Math.ceil(totalBrands / limit),
             totalBrands,
             limit,
             brand})
    }catch(error){
        res.status(500).json({Message: "Server Error"});
    }
}

export const updateBrand = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const brand = await brands.findById(id);
    
        if (!brand) {
            return res.status(404).json({message: "Brand not found"
            });
        }
        if (brand.name !== name) {
            const existingBrand = await brands.findOne({ name });
            if (existingBrand) {
                return res.status(400).json({ message: "Brand name already exists" });
            }
        }
         let logo = null;

        if (req.file) {
            const result = await uploadImage(req.file);
            if (!result.secure_url) {
                throw new Error("Image upload failed");
            }   
            logo = result.secure_url;
        }

        // Update values
        if (name) {brand.name = name;} 
        if (description) {brand.description = description;}
        if (logo) { brand.logo = logo; }

        // Save updated brand
        const updatedBrand = await brand.save();
        
        return res.status(200).json({
            message: "Brand updated successfully",
            data: updatedBrand
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await brands.findById(id);
        if(!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        await brands.findByIdAndDelete(id);
        return res.status(200).json({ message: "Brand deleted successfully" }); 

    }catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};
