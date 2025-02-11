import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { getMyProfile, login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authenticateUser,getMyProfile);
// router.put("/profile/update",authenticateUser,updateProfile)

export default router;