"use strict";
const { monetizationEndpointSchema } = require("./schema");

module.exports = async function (fastify, opts, next) {
	fastify.get(
		"/user",
		{
			preValidation: [fastify.authenticate],
		},
		/**
		 * @param {Object} request.user - has email, id and iat
		 */
		async function (request, reply) {
			const user = await fastify.models.User.findByPk(request.user.id);

			reply.send({ user });
		}
	);

	fastify.put(
		"/user/monetization-endpoint",
		monetizationEndpointSchema,
		async (request, reply) => {
			const { endpoint, userId } = request.body;

			const user = await fastify.models.User.findByPk(userId);

			try {
				await user.update({
					monetization_endpoint: endpoint,
				});

				reply.send({ success: true });
			} catch (error) {
				reply.send({ success: false });
			}
		}
	);

	next();
};
