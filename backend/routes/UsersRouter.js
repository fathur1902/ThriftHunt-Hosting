import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  authenticateJWT,
  updateAddress,
  getUserAddress,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateJWT, getProfile);
router.post("/profile", authenticateJWT, updateProfile);
router.put("/address", updateAddress);
router.get("/address/:id", getUserAddress);

export default router;
