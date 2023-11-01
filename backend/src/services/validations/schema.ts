import joi from "joi";

const userSchema = joi.object({
	name: joi.string().min(2).required(),
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
	balance: joi.number().required(),
	role: joi.string().equal("user", "admin").min(8).required(),
});

const expenseSchema = joi.object({
	title: joi.string().min(2).required(),
	price: joi.number().positive().required(),
	date: joi.date().less(new Date()),
	userId: joi.number().positive().required(),
	paymentType: joi
		.string()
		.equal("pix", "debit card", "credit card", "money", "other"),
});

export = { userSchema, expenseSchema };
