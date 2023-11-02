import { Router } from "express";
import ArticleController from "../controllers/article.controller";
import { verifyToken } from "../jwt/jwt.utils";

const control = new ArticleController();

const articleRouter = Router();

articleRouter.post("/article", verifyToken, control.create.bind(control));

export default articleRouter;
