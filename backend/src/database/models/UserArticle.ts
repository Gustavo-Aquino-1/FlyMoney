import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

export default class UserArticle extends Model {
	declare userId: number;
	declare articleId: number;
}

UserArticle.init(
	{
		userId: {
			primaryKey: true,
			type: sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "User",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		articleId: {
			primaryKey: true,
			type: sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "Article",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
	},
	{ sequelize: db, tableName: "UserArticle", timestamps: false }
);
