import express from "express"

import {createShipping, getShipping, updateShipping, deleteShipping} from "../controllers/shippingController.js";

const router = express.Router();

router.post("/create",createShipping);
router.get("/get",getShipping);
router.put("/update/:id",updateShipping);
router.delete("/delete/:id",deleteShipping);

export default router;