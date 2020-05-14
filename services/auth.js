"use strict";

const routeOpts = {
	schema: {
		body: {
			type: "object",
			properties: {
				email: { type: "string" },
				password: { type: "string" },
			},
			required: ["email", "password"],
		},
	},
};

module.exports = function (fastify, opts, next) {
	fastify.post("/signup", routeOpts, (request, reply) => {
		// save to database
		request.log.info("Creating new user...");
		const user = fastify.query(
			"INSRT INTO users (email, password) VALUES ($1, $1)",
			[email, password],
			(err, result) => {
				if (err) request.log.info("ERROR creating new user...");
				return result;
			}
		);

		console.log("newly created user", user);
		// create JWT token and return to client
		fastify.jwt.sign(request.body, (err, token) => {
			if (err) return reply.send(err);
			request.log.info("User created!");
			reply.send({ token });
		});
	});

	next();
};
