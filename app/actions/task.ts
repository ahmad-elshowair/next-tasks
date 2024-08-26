"use server";
import {
	AdminTaskStateFrom,
	DeleteStateForm,
	Task,
	TaskSchema,
	TasksTable,
	UserTaskStateFrom,
} from "@/lib/definitions";
import pool from "@/lib/pool";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PoolClient, QueryResult } from "pg";

const ITEMS_PER_PAGE = 6;

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

		const session = await verifySession();

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

		const session = await verifySession();

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
		const result: QueryResult<Task> = await connection.query(sqlQuery, [id]);
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

const CreateUserTaskSchema = TaskSchema.omit({
	is_completed: true,
	task_id: true,
});

export const createUserTask = async (
	prevState: UserTaskStateFrom,
	formData: FormData,
): Promise<UserTaskStateFrom> => {
	const session = await verifySession();

	const validatedFields = CreateUserTaskSchema.safeParse({
		title: formData.get("title"),
		user_id: session?.user_id,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields, Failed to create tasks",
			status: "error",
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
			message: (error as Error).message,
			status: "error",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
	revalidatePath("/my-tasks");
	redirect("/my-tasks");
};

const AdminCreateTaskSchema = TaskSchema.omit({ task_id: true });
export const createAdminTask = async (
	prevState: AdminTaskStateFrom,
	formData: FormData,
): Promise<AdminTaskStateFrom> => {
	const validatedFields = AdminCreateTaskSchema.safeParse({
		user_id: formData.get("user_id"),
		title: formData.get("title"),
		is_completed: formData.get("is_completed") === "true",
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Failed to Create Admin tasks",
			status: "error",
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
			message: (error as Error).message,
			status: "error",
		};
	} finally {
		connection.release();
	}

	revalidatePath("all-tasks");
	redirect("/all-tasks");
};

export const deleteTask = async (
	id: string,
	link?: string,
): Promise<DeleteStateForm> => {
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
			revalidatePath(`/${link}`);
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

const AdminUpdateTaskSchema = TaskSchema.omit({ task_id: true });
export const adminUpdateTask = async (
	task_id: string,
	prevState: AdminTaskStateFrom,
	formData: FormData,
): Promise<AdminTaskStateFrom> => {
	const validatedFields = AdminUpdateTaskSchema.safeParse({
		title: formData.get("title"),
		user_id: formData.get("user_id"),
		is_completed: formData.get("is_completed") === "true",
	});

	if (!validatedFields.success) {
		return {
			message: "Invalid data",
			errors: validatedFields.error.flatten().fieldErrors,
			status: "error",
		};
	}

	const { title, user_id, is_completed } = validatedFields.data;

	const connection = await pool.connect();
	try {
		const sqlQuery = `
			UPDATE tasks 
			SET
				title = $1,
				is_completed = $2,
				user_id = $3
			WHERE 
				task_id = $4
		`;
		const values = [title, is_completed, user_id, task_id];
		const session = await verifySession();

		if (session?.user_id === user_id || session?.role === "admin") {
			await connection.query(sqlQuery, values);

			revalidatePath("/all-tasks");

			return {
				message: "Task updated successfully",
				status: "success",
			};
		}
		return {
			message: "You do not have permission to update this task",
			status: "error",
		};
	} catch (error) {
		console.error(`Database Error: ${error as Error}`);
		return {
			message: (error as Error).message,
			status: "error",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};

const UserUpdateTaskForm = TaskSchema.omit({ task_id: true, user_id: true });
export const userUpdateTask = async (
	task_id: string,
	prevState: UserTaskStateFrom,
	formData: FormData,
): Promise<UserTaskStateFrom> => {
	const validatedFields = UserUpdateTaskForm.safeParse({
		title: formData.get("title"),
		is_completed: formData.get("is_completed") === "true",
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error?.flatten().fieldErrors,
			status: "error",
			message: "Invalid Data",
		};
	}

	const { title, is_completed } = validatedFields.data;

	const task = await fetchTaskById(task_id);
	if (!task) {
		return {
			status: "error",
			message: "Task not found",
		};
	}
	const connection = await pool.connect();
	try {
		const sqlQuery = `
			UPDATE tasks
			SET 
				title = $1, 
				is_completed = $2
			WHERE 
				task_id = $3
		`;
		const values = [title, is_completed, task_id];

		const session = await verifySession();

		if (session?.user_id === task.user_id || session?.role === "admin") {
			await connection.query(sqlQuery, values);
			revalidatePath("/my-tasks");
			return {
				status: "success",
				message: "Task updated successfully",
			};
		}
		return {
			status: "error",
			message: "You do not have permission to update this task",
		};
	} catch (error) {
		console.error(`Database Error: ${error as Error}`);
		return {
			message: (error as Error).message,
			status: "error",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};
