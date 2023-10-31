"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Article", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
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
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			context: {
				type: Sequelize.STRING(5000),
				allowNull: false,
			},
			link: {
				type: Sequelize.STRING(4000),
				allowNull: false,
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Article", {}, null);
	},
};
