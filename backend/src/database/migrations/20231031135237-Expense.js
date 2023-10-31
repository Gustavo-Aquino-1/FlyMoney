"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Expense", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			paymentType: {
				type: Sequelize.ENUM([
					"pix",
					"debit card",
					"credit card",
					"money",
					"other",
				]),
				allowNull: false,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			date: {
				type: Sequelize.DATE,
				defaultValue: new Date(),
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
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Expense", {}, null);
	},
};
