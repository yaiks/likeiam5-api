"use strict";
const fp = require("fastify-plugin");

const verifyToken = (cookie) => {
	return null;
};

module.exports = fp(function (fastify, opts, next) {
	fastify.decorate("verifyJWT", function (request, reply, done) {
		const cookie = request.cookie["mycookie"];
		const userData = verifyToken(cookie);

		request.params.user = userData || { nothing: "here" };
		return done(); // now request goes to route handler
	});
	next();
});
