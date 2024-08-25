"use server";
import {
	AdminCreateTaskStateFrom,
	DeleteStateForm,
	TasksTable,
	UserCreateTaskStateFrom,
} from "@/lib/definitions";
import pool from "@/lib/pool";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PoolClient, QueryResult } from "pg";
import { z } from "zod";

const ITEMS_PER_PAGE = 6;

const session = await verifySession();

export const fetchFilteredMyTasks = async (
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

export const fetchFilteredAllTasks = async (
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
				tasks.title ILIKE $1 OR
				users.user_name ILIKE $1 OR
				tasks.created_at::text ILIKE $1 OR
				users.email ILIKE $1
            ORDER BY tasks.created_at DESC
            LIMIT $2 OFFSET $3
            `;

		const values = [`%${query}%`, ITEMS_PER_PAGE, offset];
		const tasks: QueryResult<TasksTable> = await connection.query(
			sqlQuery,
			values,
		);
		return tasks.rows;
	} catch (error) {
		console.error(`Database Error: ${(error as Error).message}`);
		throw new Error("Failed to fetch all filtered tasks", error as Error);
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};

export const fetchMyTasksPages = async (query: string) => {
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
		throw new Error("Failed to fetch my tasks pages", error as Error);
	} finally {
		// Ensure that the client is released in case of error or success
		if (connection) {
			connection.release();
		}
	}
};

export const fetchAllTasksPages = async (query: string) => {
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
		throw new Error("Failed to fetch all tasks pages", error as Error);
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

const CreateUserTaskSchema = z.object({
	title: z
		.string()
		.min(10, { message: "describe your task with at least 10 characters!" }),
	user_id: z.string(),
});

export const createUserTask = async (
	prevState: UserCreateTaskStateFrom,
	formData: FormData,
): Promise<UserCreateTaskStateFrom> => {
	const validatedFields = CreateUserTaskSchema.safeParse({
		title: formData.get("title"),
		user_id: session?.user_id,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields, Failed to create tasks",
		};
	}

	const { title, user_id } = validatedFields.data;

	const connection: PoolClient = await pool.connect();
	try {
		await connection.query("BEGIN");

		await connection.query(
			`INSERT INTO tasks (title, user_id) VALUES ($1, $2)`,
			[title, user_id],
		);

		await connection.query("COMMIT");
	} catch (error) {
		await connection.query("ROLLBACK");
		console.error(`Database Error: ${(error as Error).message}`);
		return {
			errors: { other: [(error as Error).message] },
			message: "Failed to Create tasks",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
	revalidatePath("/my-tasks");
	redirect("/my-tasks");
};

const CreateAdminTaskSchema = z.object({
	user_id: z.string({ invalid_type_error: "Please Select  a User" }),
	title: z.string().min(10, {
		message: "Please describe your task with at least 10 characters!",
	}),
	is_completed: z.boolean({
		invalid_type_error: "Please select the task status",
	}),
});
export const createAdminTask = async (
	prevState: AdminCreateTaskStateFrom,
	formData: FormData,
): Promise<AdminCreateTaskStateFrom> => {
	const validatedFields = CreateAdminTaskSchema.safeParse({
		user_id: formData.get("user_id"),
		title: formData.get("title"),
		is_completed: formData.get("is_completed") === "true",
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Failed to Create Admin tasks",
		};
	}
	const { user_id, title, is_completed } = validatedFields.data;
	const connection = await pool.connect();
	try {
		await connection.query("BEGIN");

		const sqlQuery = `
		INSERT INTO tasks (user_id, title, is_completed) VALUES($1, $2, $3)`;

		const values = [user_id, title, is_completed];

		await connection.query(sqlQuery, values);

		await connection.query("COMMIT");
	} catch (error) {
		await connection.query("ROLLBACK");

		console.error(`Database Error: ${error as Error}`);
		return {
			errors: {
				other: [(error as Error).message],
			},
		};
	} finally {
		connection.release();
	}

	revalidatePath("all-tasks");
	redirect("/all-tasks");
};

export const deleteTask = async (id: string): Promise<DeleteStateForm> => {
	const connection = await pool.connect();
	try {
		const sqlQuery = `
		DELETE FROM tasks WHERE task_id = $1`;
		const values = [id];

		const task = await fetchTaskById(id);
		if (!task) {
			return {
				message: "Task not found",
				status: "error",
			};
		}

		const session = await verifySession();
		if (task.user_id === session?.user_id || session?.role === "admin") {
			await connection.query(sqlQuery, values);
			revalidatePath(`/tasks`);
			return {
				message: "Task Deleted successfully!",
				status: "success",
			};
		}
		return {
			message: "You don't have permission to delete this task",
			status: "error",
		};
	} catch (error) {
		console.error(`Database Error: ${error as Error}`);
		return {
			message: (error as Error).message,
			status: "error",
		};
	} finally {
		connection.release();
	}
};
