import express from "express";

import {createBrand,getAllBrand} from "../controllers/brandController.js";
import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();

router.post("/create", brandMulter.single('logo'), createBrand);

router.get("/all", getAllBrand);
export default router;
