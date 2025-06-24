import express from "express";
import { updateUserInfo, updatePassword } from "../controllers/userController.js";
import { authenticateToken } from "../Middleware/auth.js";

const router = express.Router();

router.put("/update-info", authenticateToken, updateUserInfo);
router.put("/update-password", authenticateToken, updatePassword);

export default router;
