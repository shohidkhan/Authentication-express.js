import express, { Router } from "express";
import {
  getUserData,
  home,
  logout,
  signIn,
  signUp,
} from "../controllers/auth.controllers.js";
import { upload } from "../middleware/multer.js";
import { checkAuth } from "../middleware/checkAuth.js";

const authRouter = express(Router());
authRouter.get("/", home);

authRouter.post("/signup", upload.single("profileImage"), signUp);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);
authRouter.get("/getuserdata", checkAuth, getUserData);

export default authRouter;
