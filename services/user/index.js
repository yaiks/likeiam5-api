module.exports = async function (fastify, opts, next) {
	fastify.get(
		"/user",
		{
			preValidation: [fastify.authenticate],
		},
		async function (request, reply) {
			return request.user;
		}
	);

	next();
};
