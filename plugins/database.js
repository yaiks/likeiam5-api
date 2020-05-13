"use strict";

// const fastifyPlugin = require('fastify-plugin')
const postgres = require("fastify-postgres");
const keys = require("../keys");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

postgres.autoConfig = {
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort,
};

module.exports = postgres;
