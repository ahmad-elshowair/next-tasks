import pool from "@/app/lib/pool";

export const fetchFilteredUsers = async (
	query: string,
	currentPage: number,
) => {
	const client = await pool.connect();
	try {
		const users = await client.query(`
            SELECT * FROM users
            `);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error((error as Error).message);
	} finally {
		client.release();
	}
};
