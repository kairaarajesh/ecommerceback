import {tax} from "../models/tax.js";


export const createTax = async (req, res) => {
    try {
        const { stateName, taxPrice,taxStatus } = req.body;

        const existingTax = await tax.findOne({ stateName });
           if(existingTax){
            return res.status(400).json({ message: "Tax for this state already exists" });
           }


        const taxData = new tax({
            stateName,
            taxPrice, 
            taxStatus
        });

        const taxDetails = await taxData.save();

        return res.status(201).json({
            message: "Tax created successfully",
            data: taxDetails,
        });
    }
    catch (error) {
        console.log("Error in createTax:", error);
        res.status(500).json({ message: "Server Error" });
    }   
}

export const getAllTax = async(req, res) => {
    try{
        const page =parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page -1) * limit;

        const totalTax = await tax.countDocuments();
        const taxDetails = await tax.find().sort({ _id: -1 }).skip(skip).limit(limit);

        return res.status(201).json({ Message: "Get All Tax",
            currentPage:page,
             totalPages: Math.ceil(totalTax / limit),
             totalTax,
             taxDetails})
    }catch(error){
        res.status(500).json({Message: "Server Error"});
    }
}

export const updateTax = async (req, res) => {
    try {
        const { stateName, taxPrice,taxStatus } = req.body;
        const { id } = req.params;
        const taxData = await tax.findById(id);
        if (!taxData) {
            return res.status(404).json({ message: "Tax not found" });
        }
        
        const taxes = await tax.findByIdAndUpdate(id, {
            stateName,taxPrice,taxStatus
        })
        return res.status(200).json({
          Message : "Tax Update Successfully",taxes
        })

    }catch(error){
         res.status(500).json({Message: "Server Error"});
    }
}

export const deleteTax = async (req, res) =>{
    try{
        const {id} = req.params;
        const taxData = await tax.findById(id)

        if(!taxData){
            return res.status(404).json({
                message: "Tax ID not found"
            }) 
        }
        const taxes = await tax.findByIdAndDelete(id);

        return res.status(200).json({
        Message : "Tax Delete Successfully"
        })

    }catch(error){
        console.log("====",error);
      res.status(500).json({Message: "Server Error"});
    }
}
