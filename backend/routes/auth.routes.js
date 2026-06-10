import express, { Router } from "express";
import {
  home,
  logout,
  signIn,
  signUp,
} from "../controllers/auth.controllers.js";

const authRouter = express(Router());
authRouter.get("/", home);

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);

export default authRouter;
