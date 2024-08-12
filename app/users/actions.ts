import { UserSTable } from "@/app/lib/definitions";
import pool from "@/app/lib/pool";
import { QueryResult } from "pg";

const ITEMS_PER_PAGE = 3;
export const fetchFilteredUsers = async (
	query: string,
	currentPage: number,
) => {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const client = await pool.connect();
	try {
		const users: QueryResult<UserSTable> = await client.query(
			`
            SELECT * FROM users
			WHERE 
				user_name ILIKE $1 OR
				email ILIKE $1 OR
				created_at::text ILIKE $1
			ORDER BY created_at DESC
			LIMIT $2
			OFFSET $3	
            `,
			[`%${query}%`, ITEMS_PER_PAGE, offset],
		);
		return users.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error((error as Error).message);
	} finally {
		client.release();
	}
};
