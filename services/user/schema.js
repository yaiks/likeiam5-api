const monetizationEndpointSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				endpoint: { type: "string" },
				userId: { type: "integer" },
			},
			required: ["endpoint", "userId"],
		},
	},
};

module.exports = {
	monetizationEndpointSchema,
};
