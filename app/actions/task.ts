"use server";
import { TasksTable } from "@/app/lib/definitions";
import pool from "@/app/lib/pool";
import { QueryResult } from "pg";
import { verifySession } from "../lib/session";

const ITEMS_PER_PAGE = 6;

const session = await verifySession();

export const fetchFilteredTasks = async (
	query: string,
	currentPage: number,
) => {
	const connection = await pool.connect();
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
		const sqlQuery = `
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
				tasks.user_id = $1 AND
                (
					tasks.title ILIKE $2 OR
					users.user_name ILIKE $2 OR
					tasks.created_at::text ILIKE $2 OR
                	users.email ILIKE $2
				)
            ORDER BY tasks.created_at DESC
            LIMIT $3 OFFSET $4
            `;

		const values = [session?.user_id, `%${query}%`, ITEMS_PER_PAGE, offset];
		const tasks: QueryResult<TasksTable> = await connection.query(
			sqlQuery,
			values,
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
				tasks.user_id = $1 AND
				(
					tasks.title ILIKE $2 OR
					tasks.created_at::text ILIKE $2 OR
					users.user_name ILIKE $2 OR
					users.email ILIKE $2
				)`;
		const values = [session?.user_id, `%${query}%`];
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

export const fetchTaskById = async (id: string) => {
	const connection = await pool.connect();
	try {
		const sqlQuery = `
			SELECT * FROM tasks WHERE task_id = $1;
		`;
		const result = await connection.query(sqlQuery, [id]);
		const task = result.rows[0];
		return task;
	} catch (error) {
		console.error(`Database Error: ${(error as Error).message}`);
		throw new Error("Failed to fetch task by id", error as Error);
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};
