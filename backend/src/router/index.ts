import { Router } from "express";
import userRouter from "./user.routes";
import expenseRouter from "./expense.routes";
import articleRouter from "./article.routes";

const router = Router();

router.use(userRouter);
router.use(expenseRouter);
router.use(articleRouter);

export default router;
