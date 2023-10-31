import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import IUser from "../interfaces/IUser";
import schema from "./validations/schema";
import resp from "../utils/resp";
import md5 from "md5";

export default class UserService {
	private model: ModelStatic<User> = User;

	async create(data: IUser) {
		const { error } = schema.userSchema.validate(data);
		if (error) return resp(400, error.message);

		const user = await this.model.create({
			...data,
			password: md5(data.password),
		});
		return resp(201, user);
	}
}
