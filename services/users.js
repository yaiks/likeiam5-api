"use strict";

module.exports = function (fastify, opts, next) {
	fastify.get("/user", function (request, reply) {
		reply.send("this is an example");
	});

	fastify.get("/user/:id", function (request, reply) {
		reply.send("this is an example with id " + request.params.id);
	});

	next();
};
