import { NextFunction, Request, Response } from "express";
import ExpenseService from "../services/expense.service";

export default class ExpenseController {
	private service = new ExpenseService();

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user.id;
			const { status, message } = await this.service.create(req.body, userId);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}

	async get(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user.id;
			const { year, month, day } = req.query;
			const { status, message } = await this.service.get(
				userId,
				Number(year),
				Number(month),
				Number(day)
			);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}
}