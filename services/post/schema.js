const postSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				title: { type: "string" },
				content: { type: "object" },
				HTMLContent: { type: "string" },
				premium: { type: ["object", "array"] },
				HTMLPremium: { type: "string" },
				user: { type: "object" },
				category: { type: "object" },
			},
			required: ["title", "content", "user", "category"],
		},
	},
};

module.exports = {
	postSchema,
};
