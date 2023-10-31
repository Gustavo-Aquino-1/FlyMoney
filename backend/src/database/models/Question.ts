import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

export default class Question extends Model {
	declare id: number;
	declare userId: number;
	declare title: string;
	declare resolved: boolean;
}

Question.init(
	{
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
		title: {
			type: sequelize.STRING,
			allowNull: false,
		},
		resolved: {
			type: sequelize.BOOLEAN,
			defaultValue: false,
		},
	},
	{ sequelize: db, tableName: "Question", timestamps: false }
);
