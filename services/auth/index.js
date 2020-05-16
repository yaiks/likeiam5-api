"use strict";
const simpleGet = require("simple-get");
const { signupSchema } = require("./schema");

function authRoutes(fastify, opts, next) {
	/**
	 * Route for signup with email and password
	 * @returns {(Object)} Object of strings with sub, name, given_name, family_name, picture, locale
	 */
	fastify.post("/signup", signupSchema, async (request, reply) => {
		request.log.info("Creating new user...");
		const { email, password } = request.body;

		// abstract everything to other place
		const user = await fastify.models.User.create({ password, email });
		const generateToken = ({ id, email }) => fastify.jwt.sign({ id, email });
		const token = generateToken(user);
		reply.send({ token });
	});

	/**
	 * Returns the user info from google when access /login/google
	 * @returns {(Object)} Object with sub, name, given_name, family_name, picture, email, email_verified, locale
	 */
	fastify.get("/login/google/callback", (request, reply) => {
		fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
			request,
			(result) => {
				simpleGet.concat(
					{
						url: "https://www.googleapis.com/oauth2/v3/userinfo",
						method: "GET",
						headers: {
							Authorization: `Bearer ${result.token.access_token}`,
						},
						json: true,
					},
					async (err, res, data) => {
						if (err) {
							reply.send(err);
							return;
						}

						const { sub, email, name } = data;
						let user = await fastify.models.User.findByLogin(email);

						if (!user) {
							user = await fastify.models.User.create({
								email,
								google_id: sub,
								username: name,
							});
						}
						const generateToken = ({ id, email }) =>
							fastify.jwt.sign({ id, email });
						const token = generateToken(user);
						reply.send(token);
					}
				);
			}
		);
	});

	next();
}

module.exports = authRoutes;
