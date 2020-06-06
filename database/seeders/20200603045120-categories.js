"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		const categories = [
			{ name: "web" },
			{ name: "biology" },
			{ name: "math" },
			{ name: "law" },
		];
		return queryInterface.bulkInsert("categories", categories, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("categories", null, {});
	},
};
