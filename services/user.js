"use strict";

module.exports = function (fastify, opts, next) {
	const routeOptions = {
		preHandler: fastify.auth([fastify.verifyJWT]),
	};

	fastify.get("/user", function (request, reply) {
		reply.send("this is an example");
	});

	fastify.get("/user/:id", routeOptions, function (request, reply) {
		reply.send("this is an example with id " + request.params.id);
	});

	next();
};
