import { NextFunction, Request, Response } from "express";
import ArticleService from "../services/article.service";

export default class ArticleController {
	private service = new ArticleService();

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { id, role } = res.locals.user;
			const { status, message } = await this.service.create(req.body, id, role);
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
