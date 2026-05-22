import express from "express";
import dotenv from "dotenv";
import connectdb from "./database/db.js";

// routes api cpnnect server
import brandRoutes from "./routes/brandRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;   

app.listen(port, async () => {
    try {
        await connectdb();
        console.log(`Server is running on port  ${port}`);
    }catch(error) {
         console.error("Database connection error:", error);
    }
});
    

app.use(express.json());

app.use("/api/brand", brandRoutes);
