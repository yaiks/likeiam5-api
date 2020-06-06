const category = (sequelize, DataTypes) => {
	const Category = sequelize.define("category", {
		name: {
			type: DataTypes.STRING,
		},
	});

	Category.associate = (models) => {
		Category.belongsToMany(models.Post, {
			foreignKey: "category_id",
			through: "post_categories",
			as: "posts",
		});
	};

	return Category;
};

module.exports = category;
