import express from "express";

import { createCategory,getAllCategory,updateCategory,deleteCategory } from "../controllers/categoryConroller.js";
import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();

router.post("/create", brandMulter.fields([{ name: "cimage", maxCount: 1 },{ name: "image", maxCount: 10 }]), createCategory);
router.get("/all", getAllCategory);
router.put("/update/:id", brandMulter.fields([{ name: "cimage", maxCount: 1 },{ name: "image", maxCount: 10 }]), updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
