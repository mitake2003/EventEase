import { Router } from "express";
import { getUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(jwtVerify, logoutUser);

router.route("/users").get(getUsers);

export default router;