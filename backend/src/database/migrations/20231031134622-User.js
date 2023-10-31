"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("User", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			balance: {
				type: Sequelize.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			role: {
				type: Sequelize.ENUM(["user", "admin"]),
				defaultValue: "user",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("User", {}, null);
	},
};
