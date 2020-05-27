"use strict";
require("dotenv").config();
const path = require("path");
const AutoLoad = require("fastify-autoload");
const fastifyAuth = require("fastify-auth");
const fastifyCors = require("fastify-cors");
const fastifyCookie = require("fastify-cookie");
const { models, sequelize } = require("./models");

module.exports = function (fastify, opts, next) {
	// Place here your custom code!
	fastify.register(fastifyAuth);
	fastify.register(fastifyCookie);
	fastify.register(fastifyCors, {
		credentials: true,
	});
	sequelize.sync();
	fastify.decorate("models", models);

	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, "plugins"),
		options: Object.assign({}, opts),
	});

	// This loads all plugins defined in services
	// define your routes in one of these
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, "services"),
		options: Object.assign({}, opts),
	});

	// Make sure to call next when done
	next();
};
