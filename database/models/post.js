const post = (sequelize, DataTypes) => {
	const Post = sequelize.define("post", {
		title: DataTypes.STRING,
		content: DataTypes.JSONB,
		html_content: DataTypes.TEXT,
		premium: DataTypes.JSONB,
		html_premium: DataTypes.TEXT,
	});

	Post.associate = (models) => {
		Post.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

		Post.belongsToMany(models.Category, {
			foreignKey: "post_id",
			through: "post_categories",
			as: "categories",
		});
	};

	return Post;
};

module.exports = post;
