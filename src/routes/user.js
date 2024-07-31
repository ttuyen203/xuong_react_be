import express from "express";
import UserController from "../controllers/userController.js";
const router = express.Router();

const userController = new UserController();

router.post(`/auth/register`, userController.registerUser);
router.post(`/auth/login`, userController.loginUser);
export default router;
