module.exports = {
	dialect: "postgres",
	username: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	define: {
		timestamps: true,
		underscored: true,
	},
};
