"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("UserArticle", {
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "User",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			articleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Article",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("UserArticle", {}, null);
	},
};
