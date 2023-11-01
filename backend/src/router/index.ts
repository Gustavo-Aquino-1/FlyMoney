import { Router } from "express";
import userRouter from "./user.routes";
import expenseRouter from "./expense.routes";

const router = Router();

router.use(userRouter);
router.use(expenseRouter);

export default router;
