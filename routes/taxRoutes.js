import express from "express";

import {createTax, getAllTax, updateTax, deleteTax} from "../controllers/taxController.js";

const router = express.Router();

router.post("/create", createTax);
router.get("/all", getAllTax);
router.put("/update/:id", updateTax);
router.delete("/delete/:id", deleteTax)

export default router;