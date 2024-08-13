"use server";
import { TasksTable } from "@/app/lib/definitions";
import pool from "@/app/lib/pool";
import { QueryResult } from "pg";

const ITEMS_PER_PAGE = 6;
export const fetchFilteredTasks = async (
	query: string,
	currentPage: number,
) => {
	const connection = await pool.connect();
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
		const tasks: QueryResult<TasksTable> = await connection.query(
			`
            SELECT
                tasks.task_id,
                tasks.title,
                tasks.is_completed,
                tasks.created_at,
                users.user_name,
                users.email,
                users.image_url
            FROM tasks
            JOIN users ON tasks.user_id = users.user_id
            WHERE
                tasks.title ILIKE $1 OR
                tasks.created_at::text ILIKE $1 OR
                users.user_name ILIKE $1 OR
                users.email ILIKE $1
            ORDER BY tasks.created_at DESC
            LIMIT $2 OFFSET $3
            `,
			[`%${query}%`, ITEMS_PER_PAGE, offset],
		);
		return tasks.rows;
	} catch (error) {
		console.error(`Database Error: ${(error as Error).message}`);
		throw new Error((error as Error).message);
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};

export const fetchTasksPages = async (query: string) => {
	const connection = await pool.connect();
	try {
		const sqlQueryText = `
            SELECT
                COUNT(*)
            FROM tasks
            JOIN users ON tasks.user_id = users.user_id
            WHERE
                tasks.title ILIKE $1 OR
                tasks.created_at::text ILIKE $1 OR
                users.user_name ILIKE $1 OR
                users.email ILIKE $1
            `;
		const values = [`%${query}%`];
		const result = await connection.query(sqlQueryText, values);
		const totalTasks = parseInt(result.rows[0].count, 10);
		const totalPages = Math.ceil(totalTasks / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error(`Database Error: ${(error as Error).message}`);
		throw new Error("Failed to fetch tasks pages");
	} finally {
		// Ensure that the client is released in case of error or success
		if (connection) {
			connection.release();
		}
	}
};
