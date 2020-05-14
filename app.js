"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");
const keys = require("./keys");

module.exports = function (fastify, opts, next) {
	// Place here your custom code!

	fastify.register(require("fastify-postgres"), {
		user: keys.pgUser,
		host: keys.pgHost,
		database: keys.pgDatabase,
		password: keys.pgPassword,
		port: keys.pgPort,
	});
	fastify.register(require("fastify-auth"));
	fastify.register(require("fastify-jwt"), {
		secret: "mysupersecret",
	});

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
