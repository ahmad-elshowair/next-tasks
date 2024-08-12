import { Pool } from "pg";

const pool = new Pool({
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT || "5432"),
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
});

pool.on("error", (error: Error) => {
	console.log("unexpected error on idle client", error.message);
	process.exit(-1);
});

export default pool;
