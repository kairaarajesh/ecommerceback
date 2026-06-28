import express from "express";

import {createProduct} from "../controllers/productController.js";
import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();

router.post("/create",brandMulter.single('pImage'), createProduct );

export default router;