const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

const sequelize = new Sequelize(dbConfig);

const models = {
	User: sequelize.import("./user"),
	Post: sequelize.import("./post"),
	Category: sequelize.import("./category"),
};

Object.keys(models).forEach((key) => {
	if ("associate" in models[key]) {
		models[key].associate(models);
	}
});

module.exports = {
	sequelize,
	models,
};
