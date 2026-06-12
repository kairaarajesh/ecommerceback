import express from "express";
import { createAdmin,getAllAdmin, updateAdmin, deleteAdmin , loginAdmin} from "../controllers/adminController.js";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/get", getAllAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deleteAdmin);

router.post("/login", loginAdmin);

export default router;