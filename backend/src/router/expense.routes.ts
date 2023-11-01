import { Router } from "express";
import { verifyToken } from "../jwt/jwt.utils";
import ExpenseController from "../controllers/expense.controller";

const control = new ExpenseController();

const expenseRouter = Router();

expenseRouter.post("/expense", verifyToken, control.create.bind(control));
expenseRouter.get("/expense", verifyToken, control.get.bind(control));
expenseRouter.put("/expense/:id", verifyToken, control.update.bind(control));

export default expenseRouter;
