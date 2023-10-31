import joi from "joi";

const userSchema = joi.object({
	name: joi.string().min(2).required(),
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
	balance: joi.number().required(),
	role: joi.string().equal("user", "admin").min(8).required(),
});

export = { userSchema };
