"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Question", {
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
			resolved: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Question", {}, null);
	},
};
