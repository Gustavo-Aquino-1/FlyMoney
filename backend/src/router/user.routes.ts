import { Router } from "express";
import UserController from "../controllers/user.controller";

const control = new UserController();

const userRouter = Router();

userRouter.post("/user", control.create.bind(control));

export default userRouter;
