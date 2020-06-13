const bcrypt = require("bcrypt");

const user = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			google_id: DataTypes.STRING,
			monetization_endpoint: DataTypes.STRING,
		}
		// {
		// 	defaultScope: {
		// 		attributes: { exclude: ["password"] },
		// 	},
		// }
	);

	User.associate = (models) => {
		User.hasMany(models.Post, {
			onDelete: "CASCADE",
			foreignKey: "user_id",
			as: "posts",
		});
	};

	User.findByLogin = async (login) => {
		let user = await User.findOne({
			where: { name: login },
		});

		if (!user) {
			user = await User.findOne({
				where: { email: login },
			});
		}

		return user;
	};

	User.beforeCreate(async (user) => {
		if (user.password) {
			user.password = await user.generatePasswordHash();
		}
	});

	User.prototype.generatePasswordHash = async function () {
		const saltRounds = 10;
		return await bcrypt.hash(this.password, saltRounds);
	};

	User.prototype.validatePassword = async function (password) {
		return await bcrypt.compare(password, this.password);
	};

	return User;
};

module.exports = user;
