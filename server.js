import express from "express";
import dotenv from "dotenv";
import connectdb from "./database/db.js";
import cors from "cors";

// routes api cpnnect server
import adminRoutes from "./routes/adminRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import taxRoutes from "./routes/taxRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import userRoutes from "./routes/userRoutes.js";






dotenv.config();

const app = express();
const port = process.env.PORT || 5000;   

app.listen(port, async () => {
    try {
        await connectdb();
        // console.log(`Server is running on port  ${port}`);
    }catch(error) {
         console.error("Database connection error:", error);
    }
});
    

app.use(express.static("."));
app.use(cors());
app.listen(7000, () => {
  console.log("Server is running on http://localhost:7000");
});

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/brand", brandRoutes);
// app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/user",userRoutes)

