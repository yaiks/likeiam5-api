const signupSchema = {
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

module.exports = {
	signupSchema,
};
