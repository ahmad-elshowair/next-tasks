import configs from "@/configs/configs";
import { Pool } from "pg";

const pool = new Pool({
	host: configs.db.host,
	port: configs.db.port,
	user: configs.db.user,
	password: configs.db.password,
	database: configs.db.database,
	ssl: false,
});

pool.on("error", (error: Error) => {
	console.error("Database connection error:", error.message);
	process.exit(-1);
});

// Test connection
pool.query("SELECT NOW()", (err, res) => {
	if (err) {
		console.error("Database connection test failed:", err.message);
	} else {
		console.log("Database connected successfully");
	}
});

export default pool;
