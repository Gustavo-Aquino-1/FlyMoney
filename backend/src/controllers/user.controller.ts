import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
	private service = new UserService();

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { status, message } = await this.service.create(req.body);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { status, message } = await this.service.login(req.body);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}

	async saveArticle(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = res.locals.user.id;
			const { id } = req.params;
			const { status, message } = await this.service.saveArticle(userId, +id);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}
}
