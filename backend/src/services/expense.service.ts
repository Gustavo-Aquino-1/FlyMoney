import { ModelStatic, Sequelize } from "sequelize";
import Expense from "../database/models/Expense";
import IExpense from "../interfaces/IExpense";
import User from "../database/models/User";
import resp from "../utils/resp";
import schema from "./validations/schema";

export default class ExpenseService {
	private model: ModelStatic<Expense> = Expense;

	async create(data: IExpense, userId: number) {
		const user = await User.findByPk(userId);
		if (!user) return resp(404, "user not found");
		data.userId = userId;

		const { error } = schema.expenseSchema.validate(data);
		if (error) return resp(400, error.message);

		const expense = await this.model.create({ ...data });
		return resp(201, expense);
	}

	async get(
		userId: number,
		year = new Date().getFullYear(),
		month = new Date().getMonth() + 1,
		day?: number
	) {
		const actualDate = new Date();
		const expenses = await this.model.findAll({
			where: Sequelize.literal(
				`userId = ${userId}
				AND YEAR(date) = ${year || actualDate.getFullYear()}
				AND MONTH(date) = ${month || actualDate.getMonth() + 1}
				${day ? `AND DAY(date) = ${day}` : ""}`
			),
		});

		return resp(200, expenses);
	}
}
