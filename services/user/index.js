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
			reply.send({ user: request.user });
		}
	);

	next();
};
