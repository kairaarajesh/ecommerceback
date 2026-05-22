import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Database connected")
    }
    catch(error) {
        console.log(error)
        console.log("Database Not Connected");
       
    }
}

export default connectDB;