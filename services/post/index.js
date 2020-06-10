"use strict";
const { Op } = require("sequelize");
const { postSchema } = require("./schema");

module.exports = function (fastify, opts, next) {
	fastify.get("/posts", async function (request, reply) {
		request.log.info("Getting posts...");

		const { order, title } = request.query;

		if (order === "latest") {
			const posts = await fastify.models.Post.findAll({
				include: { association: "user" },
				order: [["createdAt", "DESC"]],
			});
			reply.send({ posts });
		} else if (title) {
			const posts = await fastify.models.Post.findAll({
				include: { association: "user" },
				where: {
					title: {
						[Op.substring]: title,
					},
				},
			});
			reply.send({ posts });
		} else {
			const posts = await fastify.models.Post.findAll({
				include: { association: "user" },
			});
			reply.send({ posts });
		}
	});

	fastify.get("/post/:postId", async function (request, reply) {
		request.log.info("Getting post by id...");
		const { postId } = request.params;

		const post = await fastify.models.Post.findByPk(postId, {
			include: { association: "user" },
		});

		reply.send({ post });
	});

	fastify.get("/posts/category/:categoryId", async function (request, reply) {
		request.log.info("Getting post by id...");

		const { categoryId } = request.params;

		const category = await fastify.models.Category.findByPk(categoryId, {
			include: {
				association: "posts",
				include: {
					association: "user",
				},
			},
		});

		reply.send({ posts: category.posts });
	});

	fastify.post("/post", postSchema, async function (request, reply) {
		request.log.info("Creating new post...");
		const {
			title,
			content,
			html_content,
			premium,
			html_premium,
			user,
			category,
		} = request.body;

		const categoryModel = await fastify.models.Category.findByPk(category.id);

		// abstract everything to other place
		const post = await fastify.models.Post.create({
			title,
			content,
			html_content,
			premium,
			html_premium,
			user_id: user.id,
		});

		await categoryModel.addPost(post);

		reply.send({ id: post.id, title: post.title });
	});

	next();
};
