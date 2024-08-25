"use server";
import { User, UserField, UserFormState, UserTable } from "@/lib/definitions";
import { hash } from "@/lib/helpers";
import { deleteFile, uploadFile } from "@/lib/manage-upload";
import pool from "@/lib/pool";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { QueryResult } from "pg";
import { z } from "zod";

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

export const fetchUserById = async (user_id: string) => {
	const client = await pool.connect();
	const session = await verifySession();
	try {
		const sqlQuery = `SELECT
							user_id, 
							user_name, 
							email, 
							image_url, 
							role, 
							created_at, 
							updated_at 
						FROM users 
						WHERE user_id = $1`;
		const result: QueryResult = await client.query(sqlQuery, [user_id]);
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

export const fetchUsersForTasks = async () => {
	const connection = await pool.connect();
	try {
		const result: QueryResult<UserField> = await connection.query(`
			SELECT user_id, user_name FROM users ORDER By user_name ASC
			`);
		const users = result.rows;
		return users;
	} catch (error) {
		console.error(`Database Error: ${error as Error}`);
		throw new Error("Failed to Users for Tasks", error as Error);
	} finally {
		connection.release();
	}
};

const CreateUserSchema = z.object({
	user_name: z
		.string()
		.min(3, { message: "Please Enter user name at least 3 characters long" })
		.trim(),
	email: z.string().email({ message: "Please Enter a valid Email" }).trim(),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long." })
		.regex(/[a-zA-Z]/, { message: "Contain at least 1 letter." })
		.regex(/[0-9]/, { message: "Contain at least 1 number." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least 1 special character (@ # $ % & !).",
		})
		.trim(),
	role: z.enum(["user", "admin"], {
		invalid_type_error: "Please choose what role this user is.",
	}),
});

export const CreateUser = async (
	prevState: UserFormState,
	formData: FormData,
): Promise<UserFormState> => {
	const validatedFields = CreateUserSchema.safeParse({
		user_name: formData.get("user_name"),
		email: formData.get("email"),
		password: formData.get("password"),
		role: formData.get("role"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields, Failed to create User",
		};
	}

	const { user_name, email, password, role } = validatedFields.data;

	let image_url = "/default-avatar.png";

	// get the file
	const file = formData.get("image_url") as File | null;

	// if file exist.
	if (file && file.size > 0) {
		// then upload the file.
		const uploadResult = await uploadFile(file, "uploads", {
			maxSize: 5 * 1024 * 1024,
			allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
		});

		if (uploadResult.success && uploadResult.filePath) {
			image_url = uploadResult.filePath;
		} else if (!uploadResult.success) {
			return {
				errors: { image_url: [uploadResult.error!] },
				message: "Failed to upload image",
			};
		}
	}
	// CHECK IF THE USER IS EXIST!
	const user = await fetchUserByEmail(email);
	if (user) {
		return {
			errors: { email: ["Email already exists"] },
			message: "Failed to create User",
		};
	}

	// HASH THE PASSWORD
	const hashedPassword: string = hash(password);
	// CONNECT TO THE DATABASE
	const connection = await pool.connect();
	try {
		await connection.query("BEGIN");
		const sqlQuery = `
		INSERT INTO 
			users (
				user_name, 
				email, 
				password, 
				role, 
				image_url
			)
		VALUES($1, $2, $3, $4, $5)
		`;
		const values = [user_name, email, hashedPassword, role, image_url];
		await connection.query(sqlQuery, values);
		await connection.query("COMMIT");
	} catch (error) {
		await connection.query("ROLLBACK");
		console.error(`ERROR CREATING A USER: ${error as Error}`);
		return {
			errors: { other: [(error as Error).message] },
			message: "Failed to create User",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
	revalidatePath("/users");
	redirect("/users");
};

const UpdateUserSchema = CreateUserSchema.omit({ password: true });
export const updateUser = async (
	prevState: UserFormState,
	formData: FormData,
): Promise<UserFormState> => {
	const validatedFields = UpdateUserSchema.safeParse({
		user_name: formData.get("user_name"),
		email: formData.get("email"),
		role: formData.get("role"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Failed to update User",
		};
	}

	const { user_name, email, role } = validatedFields.data;
	const user_id = formData.get("user_id");
	const newImageFile = formData.get("image_url") as File | null;

	const connection = await pool.connect();

	try {
		await connection.query("BEGIN");

		// Fetch the current user's image
		const currentUser = await connection.query(
			`SELECT image_url FROM users WHERE user_id = $1`,
			[user_id],
		);

		let newImageUrl: string | null = "/default-avatar.png";

		// if a new image is provided, then upload it
		if (newImageFile) {
			const uploadResult = await uploadFile(newImageFile, "uploads", {
				maxSize: 5 * 1024 * 1024,
				allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
			});

			if (!uploadResult.success) {
				return {
					errors: {
						image_url: [uploadResult.error!],
					},
					message: "Failed to upload image",
				};
			}
			newImageUrl = uploadResult.filePath;

			// delete the old image
			const oldImageUrl = currentUser.rows[0]?.image_url;
			if (oldImageUrl) {
				await deleteFile(oldImageUrl);
			}
		}
		const sqlQuery = `
		UPDATE users 
			SET user_name = $1,
				email = $2, 
				role = $3,
				image_url = COALESCE($4, image_url) 
			WHERE user_id = $5
			RETURNING *
		`;
		const values = [user_name, email, role, newImageUrl, user_id];
		const result = await connection.query(sqlQuery, values);
		if (result.rowCount === 0) {
			return {
				errors: {
					user_id: ["User not found"],
				},
				message: "User not found or no changes made",
			};
		}
		await connection.query("COMMIT");
		revalidatePath("/users");
		return {
			message: "User updated successfully",
		};
	} catch (error) {
		await connection.query("ROLLBACK");
		console.error(`ERROR UPDATING A USER: ${error as Error}`);
		return {
			errors: { other: [(error as Error).message] },
			message: "Failed to update User",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};
