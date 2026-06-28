import {products} from "../models/product.js";
import {uploadImage} from "../middleware/brandMulter.js";


export const createProduct = async (req,res) =>{

    try{
        const {pname,pShortDescription,pLongDescription,pPrice,pCategory, pSubCategory, pStock, pReviews,pDiscount} = req.body
     
     const existingProduct = await products.findOne(pname);
       if(!existingProduct){
        return res.status(400).json({
             message: "name already exists"
        })
       }

       if(req.file){
        const result = await uploadImage(req.file);

        if(!result.secure_url){
            throw new error('Image upload failed')
        }
       }

       const pro = await products({
         pname,
         pShortDescription,
         pLongDescription,
         pPrice,
         pCategory,
         pSubCategory, 
         pStock, 
         pReviews,
         pDiscount,
         pImage : result.secure_url,
       });
       const product = await pro.save();
      return res.status(201).json({
        message: "product Create Successfully"
     });
    }catch(error){
        console.log("==",error)
         res.status(500).json({
            message: "Server Error"
         });
    }

};