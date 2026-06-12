import mongoose from "mongoose"; 

const shippingSchema = new mongoose.Schema({
        stateName : {type : String, required : true},
        productShipping : {type : Number, required : true},
        comboShipping : {type : Number, required : true},
        aboveShipping : {type: Number, required: false},
        status : {type : Boolean, default : true}
    },{timestamps : true});

export const shipping = mongoose.model("shipping", shippingSchema);
    