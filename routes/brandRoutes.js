import express from "express";

import {createBrand} from "../controllers/brandController.js";
import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();

router.post("/api", brandMulter.single('logo'), createBrand);

export default router;
