import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

export default class Alert extends Model {
	declare id: number;
	declare title: string;
	declare date: Date;
	declare finished: boolean;
	declare sendEmail: boolean;
	declare userId: number;
}

Alert.init(
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
		date: {
			type: sequelize.DATE,
			allowNull: false,
		},
		finished: {
			type: sequelize.BOOLEAN,
			defaultValue: false,
		},
		sendEmail: {
			type: sequelize.BOOLEAN,
			defaultValue: true,
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
	{ sequelize: db, tableName: "Alert", timestamps: false }
);
