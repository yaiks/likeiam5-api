const post = (sequelize, DataTypes) => {
	const Post = sequelize.define("post", {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	Post.associate = (models) => {
		Post.belongsTo(models.User);
	};

	return Post;
};

module.exports = post;
