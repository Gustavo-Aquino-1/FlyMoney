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

	async get(req: Request, res: Response, next: NextFunction) {
		try {
			let { category, authorId, title } = req.query;
			[category, authorId, title] = this.format(category, authorId, title);
			const filters = [category, authorId, title].filter(
				(e) => typeof e == "string"
			) as string[];
			const { status, message } = await this.service.get(filters);
			res.status(status).json(message);
		} catch (error) {
			next(error);
		}
	}

	private format(...strArr: unknown[]) {
		const category = strArr[0] ? "category=" + strArr[0] : undefined;
		const authorId = strArr[1] ? "userId=" + strArr[1] : undefined;
		const title = strArr[2] ? "title=" + strArr[2] : undefined;
		return [category, authorId, title];
	}
}
