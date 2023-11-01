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
				Number(year) || undefined,
				Number(month) || undefined,
				Number(day) || undefined
			);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user.id;
			const { id } = req.params;
			const { status, message } = await this.service.update(
				req.body,
				+id,
				userId
			);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}
}
