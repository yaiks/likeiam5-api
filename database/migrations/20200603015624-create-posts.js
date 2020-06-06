"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("posts", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			content: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			premium: {
				type: Sequelize.JSONB,
			},
			html_content: {
				type: Sequelize.TEXT,
			},
			html_premium: {
				type: Sequelize.TEXT,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("posts");
	},
};
