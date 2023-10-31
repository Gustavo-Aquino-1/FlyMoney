import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

export default class Article extends Model {
	declare id: number;
	declare userId: number;
	declare title: string;
	declare context: string;
	declare link: string;
	declare category: string;
	declare createdAt: Date;
}

Article.init(
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
		context: {
			type: sequelize.STRING(5000),
			allowNull: false,
		},
		link: {
			type: sequelize.STRING(4000),
			allowNull: false,
		},
		category: {
			type: sequelize.STRING,
			allowNull: false,
		},
		createdAt: {
			type: sequelize.DATE,
			defaultValue: new Date(),
		},
	},
	{ sequelize: db, tableName: "Article", timestamps: false }
);
