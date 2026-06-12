import { shipping } from "../models/shipping.js";

export const createShipping = async (req, res) => {
    try {
        const { stateName, productShipping,comboShipping,aboveShipping,status } = req.body;

        const existingShipping = await shipping.findOne({ stateName });
           if(existingShipping){
            return res.status(400).json({ message: "stateName already exists" });
           }

        const shippingData = new shipping({
            stateName,
            productShipping, 
            comboShipping,
            aboveShipping,
            status
        });

        const shippingDetails = await shippingData.save();

        return res.status(201).json({
            message: "Shipping created successfully",
            data: shippingDetails,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }   
}

export const getShipping =async (req, res) => {
    try{
        const page =parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page -1) * limit;
        const totalShipping = await shipping.countDocuments();

        const ship = await shipping.find().sort({ _id: -1 }).skip(skip).limit(limit);

        return res.status(200).json({
            Message: "Get All Shipping",
            currentPage:page,
            totalPages: Math.ceil(totalShipping / limit),
            totalShipping,
            ship
        })
    }catch(error) {
        res.status(500).json({Message: "Server Error"});
    }
}

export const updateShipping = async (req, res) => {
    try{
            const { stateName, productShipping, comboShipping, aboveShipping, status  } = req.body;
            const { id } = req.params;

            const shipData = await shipping.findById(id);

                if (!shipData) {
                    return res.status(404).json({ message: "Shipping not found" });
                }
                
               if(shipping.stateName !== stateName){
                  const existingShipping = await shipping.findOne({stateName})
                    if (existingShipping) {
                            return res.status(400).json({ message: "shipping stateName already exists" });
                    }
               }

                const ship = await shipping.findByIdAndUpdate(id, {
                    stateName, productShipping, comboShipping, aboveShipping, status
                })

                return res.status(200).json({
                  Message : "shipping Update Successfully",ship
                })

        }catch(error){
                 res.status(500).json({Message: "Server Error"});
         }
}

export const deleteShipping = async (req, res) => {

try{ 
    const {id} = req.params;
    const ship  = await shipping.findById(id);

    if(!ship) {
        return res.status(404).json({message : "Shipping Not found"});
    }
    
    await shipping.findByIdAndDelete(id);
        return res.status(200).json({
            message : "Shipping Delete Successfully"
        });
    }
    catch (error) {
            console.log("Error in deleteCategory:", error);
                res.status(500).json({ message: "Server Error" });
        }
}
