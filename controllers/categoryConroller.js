import {categories} from "../models/Category.js";
import {uploadImage} from "../middleware/brandMulter.js";

export const createCategory = async (req, res) => {
    try {
        const { cname, cdescription, subCategories  } = req.body;

        let categoryImage = null;
        
        if(req.files?.cimage) {
        
            const result = await uploadImage(req.files.cimage[0]);
            categoryImage = result.secure_url;
        }
        
        let parentCategory = JSON.parse(subCategories || "[]");
        
        if (req.files?.image) {
            for (let i = 0; i < parentCategory.length; i++) {
                  parentCategory[i].image = null;

                if (req.files.image[i].image) {
                    const result = await uploadImage(req.files.image[i]);
                    parentCategory[i].image = result.secure_url;
                }
            }}
            else {
                    // No images uploaded
                    parentCategory.forEach(sub => {
                        sub.image = null;
                    });
                }
            const category = new categories({
                cname,
                cdescription,
                cimage: categoryImage,
                subCategories:parentCategory
            });
        
            const categoryData = await category.save();
            return res.status(201).json({
                message: "Category created successfully",
                data: categoryData,
            });
    }catch (error) {
        console.log("Error in createCategory:", error);
            res.status(500).json({ message: "Server Error" });
        }   
}

export const getAllCategory = async(req, res) => {
    try{
        const page =parseInt(req.query.page) || 1;
        const limit = 10;

        const skip = (page -1) * limit;

        const totalCategory = await categories.countDocuments();

        const category = await categories.find().sort({ _id: -1 }).skip(skip).limit(limit);

        return res.status(201).json(
            { Message: "Get All Category",
            currentPage:page,
            totalPages: Math.ceil(totalCategory / limit),
            totalCategory,
            category
        })

    }catch(error){
        res.status(500).json({Message: "Server Error"});
    }   
}

export const updateCategory = async (req, res) => {
    try {
        const { cname, cdescription,cstatus, subCategories  } = req.body;

        const { id } = req.params; 

        const category = await categories.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if(category.cname !== cname) {
            const existingCategory = await categories.findOne({ cname });
            if (existingCategory) {
                return res.status(400).json({ message: "Category name already exists" });
            }
        }

// subcategory name check
    const parsedSubCategories = JSON.parse(subCategories);

      for (const subCategory of parsedSubCategories) {
        const existingSubCategory = await categories.findOne({ _id:{$ne:id },"subCategories.name": subCategory.name });

      if(existingSubCategory){
        return res.status(400).json({ message: `Subcategory name  already exists` });
      }

      let image = null;

      if (req.files?.image) {
        for (let i = 0; i < parsedSubCategories.length; i++) {
            if (req.files.image[i]) {
                const result = await uploadImage(req.files.image[i]);
                parsedSubCategories[i].image = result.secure_url;
            }
        }
      }
        category.subCategories = parsedSubCategories;
      
    }

// image upload
     let cimage = null;

      if (req.files?.cimage) {
        const result = await uploadImage(req.files.cimage[0]);

       if (!result.secure_url) {
             throw new Error('Image upload failed');
         }
         cimage = result.secure_url;
      }

        const categoryyy = await categories.findByIdAndUpdate(id, {
            cname,
            cdescription,
            cstatus,
            cimage,
            category,
            subCategories:parsedSubCategories
        });
        
    return res.status(201).json({ message: "Category found", data: categoryyy });
    }catch (error) {
        console.log("Error in updateCategory:", error);
            res.status(500).json({ message: "Server Error" });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categories.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await categories.findByIdAndDelete(id);
        return res.status(200).json({ message: "Category deleted successfully" });
    }catch (error) {
        console.log("Error in deleteCategory:", error);
            res.status(500).json({ message: "Server Error" });
    }
}