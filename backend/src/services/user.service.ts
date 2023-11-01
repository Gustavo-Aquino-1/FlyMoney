import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import IUser from "../interfaces/IUser";
import schema from "./validations/schema";
import resp from "../utils/resp";
import md5 from "md5";
import { sign } from "../jwt/jwt.utils";

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

	async login(data: { email: string; password: string }) {
		const user = await this.model.findOne({
			where: { ...data, password: md5(data.password) },
		});

		if (!user) return resp(404, "user not found");

		const token = sign({ id: user.id, email: user.email, role: user.role });
		return resp(200, { token });
	}
}
