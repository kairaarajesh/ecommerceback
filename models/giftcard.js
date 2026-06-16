import mongoose from "mongoose";


const giftCardSchema = new mongoose.Schema({

    invoice_number : {type :String , unique : true},
    name : {type :String, default : true },
    number : {type : Number},
    village : {type : String, default : true},
    occasion: {type :String},
    description :{ type : String},
    previous_balance : {type :Number},
    current_balance : {type :Number},
    payment_mode:{ String},

},{timestamps : true}); 

export const giftcards = mongoose.model("giftcards", giftCardSchema);

