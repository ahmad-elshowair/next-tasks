import { User, UserTable } from "@/app/lib/definitions";
import pool from "@/app/lib/pool";
import { verifySession } from "@/app/lib/session";
import { QueryResult } from "pg";

const ITEMS_PER_PAGE = 3;
export const fetchFilteredUsers = async (
	query: string,
	currentPage: number,
) => {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const client = await pool.connect();
	try {
		const sqlQuery = `
            SELECT * FROM users
			WHERE 
				user_name ILIKE $1 OR
				email ILIKE $1 OR
				created_at::text ILIKE $1 OR
				updated_at::text ILIKE $1
			ORDER BY created_at DESC
			LIMIT $2
			OFFSET $3	
            `;
		const values = [`%${query}%`, ITEMS_PER_PAGE, offset];
		const result: QueryResult<UserTable> = await client.query(sqlQuery, values);

		return result.rows;
	} catch (error) {
		console.error("Error Fetching Filtered User : ", error);
		throw new Error((error as Error).message);
	} finally {
		client.release();
	}
};

export const fetchUsersPages = async (query: string) => {
	const client = await pool.connect();
	try {
		const sqlQuery = `
			SELECT 
				COUNT(*) 
			FROM users
			WHERE 
				user_name ILIKE $1 OR
				email ILIKE $1 OR
				created_at::text ILIKE $1 OR
				updated_at::text ILIKE $1`;
		const values = [`%${query}%`];
		const result = await client.query(sqlQuery, values);
		const totalUsers = parseInt(result.rows[0].count, 10);
		const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error(`Error Fetching Users Pages: ${(error as Error).message}`);
		throw new Error((error as Error).message);
	} finally {
		client.release();
	}
};

export const fetchUserById = async () => {
	const client = await pool.connect();
	const session = await verifySession();
	try {
		const sqlQuery = `SELECT * FROM users WHERE id = $1`;
		const result = await client.query(sqlQuery, [session?.user_id]);
		return result.rows[0];
	} catch (error) {
		console.error(`Error Fetching a User By Id: ${(error as Error).message}`);
		throw new Error((error as Error).message);
	} finally {
		client.release();
	}
};

export const fetchUserByEmail = async (email: string) => {
	const client = await pool.connect();
	try {
		const sqlQuery = `SELECT * FROM users WHERE email = $1`;
		const result: QueryResult<User> = await client.query(sqlQuery, [email]);
		return result.rows[0];
	} catch (error) {
		console.error(
			`Error Fetching a User By Email: ${(error as Error).message}`,
		);
		throw new Error((error as Error).message);
	} finally {
		client.release();
	}
};
