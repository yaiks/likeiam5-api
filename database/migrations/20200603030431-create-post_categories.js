"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("post_categories", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			post_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "posts", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "categories", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
		return queryInterface.dropTable("post_categories");
	},
};
