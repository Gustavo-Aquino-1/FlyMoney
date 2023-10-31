import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import User from "./User";

export default class Expense extends Model {
	declare id: number;
	declare title: string;
	declare paymentType: string;
	declare price: number;
	declare date: Date;
	declare userId: number;
}

Expense.init(
	{
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: sequelize.STRING,
			allowNull: false,
		},
		paymentType: {
			type: sequelize.ENUM(
				"pix",
				"debit card",
				"credit card",
				"money",
				"other"
			),
			allowNull: false,
		},
		price: {
			type: sequelize.FLOAT,
			allowNull: false,
		},
		date: {
			type: sequelize.DATE,
			defaultValue: new Date(),
		},
		userId: {
			type: sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "User",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
	},
	{ sequelize: db, tableName: "Expense", timestamps: false }
);

Expense.belongsTo(User, {
	foreignKey: "userId",
	as: "user",
});
