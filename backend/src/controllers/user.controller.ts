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
}
