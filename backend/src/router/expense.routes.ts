import { Router } from "express";
import { verifyToken } from "../jwt/jwt.utils";
import ExpenseController from "../controllers/expense.controller";

const control = new ExpenseController();

const expenseRouter = Router();

expenseRouter.post("/expense", verifyToken, control.create.bind(control));

export default expenseRouter;
