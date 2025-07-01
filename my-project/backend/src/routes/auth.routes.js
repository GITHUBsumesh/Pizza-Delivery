import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  checkAuth,
  forgotPassword,
  getMyProfile,
  login,
  logout,
  resendVerificationEmail,
  resetPassword,
  signup,
  updateProfile,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/me", authenticateUser, checkAuth);
router.get("/profile", authenticateUser, getMyProfile);
router.put("/profile/update", authenticateUser, updateProfile);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("resend-verification", resendVerificationEmail);
export default router;
