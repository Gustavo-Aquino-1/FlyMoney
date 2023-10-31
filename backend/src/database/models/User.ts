import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

export default class User extends Model {
	declare id: number;
	declare name: string;
	declare email: string;
	declare password: string;
	declare balance: number;
	declare role: string;
}

User.init(
	{
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: sequelize.STRING,
			allowNull: false,
		},
		balance: {
			type: sequelize.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		role: {
			type: sequelize.ENUM("user", "admin"),
			defaultValue: "user",
		},
	},
	{
		sequelize: db,
		tableName: "User",
		timestamps: false,
	}
);
