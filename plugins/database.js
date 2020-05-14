"use strict";

const fp = require("fastify-plugin");

module.exports = fp(function (fastify, opts, next) {
	fastify.decorate("query", function (querySQL, values, callback) {
		fastify.pg.connect((err, client, release) => {
			if (err) console.log(err);

			client.query(querySQL, values, (err, result) => {
				release();
				callback(err, result);
			});
		});
	});

	next();
});
