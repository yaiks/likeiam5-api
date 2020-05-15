const Sequelize = require("sequelize");
const keys = require("../keys");

const sequelize = new Sequelize(keys.pgDatabase, keys.pgUser, keys.pgPassword, {
	host: keys.pgHost,
	port: keys.pgPort,
	dialect: "postgres",
});

const models = {
	User: sequelize.import("./user"),
	Post: sequelize.import("./post"),
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
