import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../jwt/jwt.utils";

const control = new UserController();

const userRouter = Router();

userRouter.post("/user", control.create.bind(control));
userRouter.post("/login", control.login.bind(control));
userRouter.patch(
	"/save/article/:id",
	verifyToken,
	control.saveArticle.bind(control)
);
userRouter.get("/favorite/:id", verifyToken, control.isFavorite.bind(control));
userRouter.get(
	"/favorites",
	verifyToken,
	control.getFavoritesArticles.bind(control)
);

export default userRouter;
