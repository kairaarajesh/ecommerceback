import express from "express";

import { createBanner} from "../controllers/bannerController.js";
import { brandMulter } from "../middleware/brandMulter.js";

const router = express.Router();
routes.post("/create", brandMulter.single(image), createBanner);
export default routes;