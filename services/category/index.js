"use strict";

module.exports = function (fastify, opts, next) {
	fastify.get("/categories", async function (request, reply) {
		request.log.info("Getting all categories...");

		const categories = await fastify.models.Category.findAll({
			order: [["name", "ASC"]],
		});
		reply.send({ categories });
	});

	fastify.post("/category", async function (request, reply) {
		request.log.info("Creating category...");

		const { name } = request.body;

		const category = await fastify.models.Category.findOrCreate({
			where: { name },
		});

		reply.send({ category });
	});

	next();
};
