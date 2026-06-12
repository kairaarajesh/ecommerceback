import express from "express";

import {createBrand,getAllBrand,updateBrand,deleteBrand} from "../controllers/brandController.js";
import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();

router.post("/create", brandMulter.single('logo'), createBrand);
router.put("/update/:id", brandMulter.single('logo'), updateBrand);
router.delete("/delete/:id", deleteBrand);

router.get("/all", getAllBrand);

export default router;
