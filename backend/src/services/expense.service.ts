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
		await User.update(
			{ balance: user.balance - data.price },
			{ where: { id: userId } }
		);
		return resp(201, expense);
	}

	async get(
		userId: number,
		year = new Date().getFullYear(),
		month = new Date().getMonth() + 1,
		day?: number
	) {
		const expenses = await this.model.findAll({
			where: Sequelize.literal(
				`userId = ${userId}
				AND YEAR(date) = ${year}
				AND MONTH(date) = ${month}
				${day ? `AND DAY(date) = ${day}` : ""}`
			),
		});

		return resp(200, expenses);
	}

	async update(data: IExpense, expenseId: number, userId: number) {
		const expense = await this.model.findByPk(expenseId);
		if (!expense) return resp(404, "expense not found");
		if (expense.userId != userId) return resp(401, "unauthorized");

		data.userId = userId;
		const { error } = schema.expenseSchema.validate(data);
		if (error) return resp(400, error.message);

		await this.model.update(
			{ ...data },
			{
				where: { id: expenseId },
			}
		);

		const user = await User.findByPk(userId);

		const balance = user!.balance + expense.price - data.price;
		await User.update({ balance }, { where: { id: userId } });

		return resp(204, null);
	}

	async remove(expenseId: number, userId: number) {
		const expense = await this.model.findByPk(expenseId);
		if (!expense) return resp(404, "expense not found");
		if (expense.userId != userId) return resp(401, "unauthorized");

		await this.model.destroy({ where: { id: expenseId } });

		const user = await User.findByPk(userId);

		await User.update(
			{ balance: user!.balance + expense.price },
			{
				where: { id: userId },
			}
		);

		return resp(204, null);
	}
}
