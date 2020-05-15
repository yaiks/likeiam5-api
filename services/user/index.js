"use strict";
const signupSchema = require("./schema");

module.exports = function (fastify, opts, next) {
	fastify.post("/signup", signupSchema, async (request, reply) => {
		request.log.info("Creating new user...");
		const { email, password } = request.body;

		// abstract everything to other place
		const user = await fastify.models.User.create({ password, email });
		const generateToken = ({ id, email }) => fastify.jwt.sign({ id, email });
		const token = generateToken(user);
		reply.send({ token });
	});

	next();
};

// module.exports = function (fastify, opts, next) {
// 	const routeOptions = {
// 		preHandler: fastify.auth([fastify.verifyJWT]),
// 	};

// 	fastify.get("/user", function (request, reply) {
// 		reply.send("this is an example");
// 	});

// 	fastify.get("/user/:id", routeOptions, function (request, reply) {
// 		reply.send("this is an example with id " + request.params.id);
// 	});

// 	next();
// };
