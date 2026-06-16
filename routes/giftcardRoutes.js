import express from "express"

import {createGift, createAll} from "../controllers/giftCardController.js"


const router = express.Router();

router.post("/create",createGift);
router.get("/all",createAll);

export default router;

