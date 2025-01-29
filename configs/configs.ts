import dotenv from "dotenv";
dotenv.config();

const configs = {
	port: process.env.PORT || 3000,
	db: {
		host: String(process.env.PG_HOST),
		port: parseInt(process.env.PG_PORT || "5432", 10),
		user: String(process.env.PG_USER),
		password: String(process.env.PG_PASSWORD?.replace(/^['"]|['"]$/g, "")), // Remove quotes if present
		database: String(process.env.PG_DATABASE),
	},
	pepper: String(process.env.PEPPER),
	session_secret: String(process.env.SESSION_SECRET),
};

export default configs;
