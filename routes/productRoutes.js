import express from "express";

import {createProduct,getAllProduct, updateProduct} from "../controllers/productController.js";

import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();

router.post("/create",brandMulter.single('pImage'), createProduct );
router.get("/getall", getAllProduct );
router.put("/update/:id", brandMulter.single('pImage'), updateProduct );


export default router;