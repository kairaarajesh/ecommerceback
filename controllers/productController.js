import {products} from "../models/product.js";
import {uploadImage} from "../middleware/brandMulter.js";


export const createProduct = async (req,res) =>{

    try{
        const {pname,pShortDescription,pLongDescription,pPrice,pCategory, pSubCategory, pStock, pReviews,pDiscount} = req.body
     
     const existingProduct = await products.findOne({ pname });
       if(existingProduct){
        return res.status(400).json({
             message: "name already exists"
        })
       }


        if (req.file) {
             const result = await uploadImage(req.file);
             
             if (!result.secure_url) {
               throw new Error("Image upload failed");
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
        message: "product Create Successfully",
        data : product
     });
    }
    }catch(error){
        console.log("==",error)
         res.status(500).json({
            message: "Server Error"
         });
    }

};

export const getAllProduct = async (req , res) =>{
  try{
        const page = parseInt(req.query.page) || 1;
        const limit =10;

        const skip = (page -1 ) * limit;

        const totalProduct = await products.countDocuments();

        const Product = await products.find().skip(skip).limit(limit).sort({_id : -1 });

        return res.status(200).json({
          message : "Get All Product",
             currentPage:page,
             totalProduct: Math.ceil(totalProduct / limit),
             totalProduct,
             limit,
             Product
        });
      }catch(error){
        res.status(500).json({Message: "Server Error"});
      }
}

export const updateProduct = async (req , res) => {

  try{

    const {pname,pShortDescription,pLongDescription,pPrice,pCategory, pSubCategory, pStock, pReviews,pDiscount} = req.body
 
     const {id} = req.params;

     const product = await products.findById(id)

     if(!product){
        return res.status(404).json({
           message: "Product not found"
        });

        let pImage = null;

        if(req.file){
          const result = await uploadImage(req.file);

          pImage =result.secure_url;
        }
        const updateProduct = await product.save();

        return res.status(200).json({
          message : "Product Update Successfully",
          Data : updateProduct
        });
     }
  }catch(error){
    console.log("===",error)
    return res.status(500).json({
      Message : "Server Error"
    });
  }
}