module.exports = async function (fastify, opts, next) {
	fastify.get(
		"/user",
		{
			preValidation: [fastify.authenticate],
		},
		async function (request, reply) {
			reply.send({ user: request.user });
		}
	);

	next();
};
