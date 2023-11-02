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
}
