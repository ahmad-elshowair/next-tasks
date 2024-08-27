"use server";
import {
	CreateUserSchema,
	DeleteStateForm,
	User,
	UserField,
	UserFormState,
	UserTable,
} from "@/lib/definitions";
import { hash } from "@/lib/helpers";
import { deleteFile, uploadFile } from "@/lib/manage-upload";
import pool from "@/lib/pool";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export const fetchUserById = async (user_id: string) => {
	const client = await pool.connect();
	try {
		const sqlQuery = `SELECT * FROM users WHERE user_id = $1`;
		const result: QueryResult<User> = await client.query(sqlQuery, [user_id]);
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
		const uploadResult = await uploadFile(file);

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
			message: "Invalid Data",
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

		let newImageUrl: string | null = null;
		// if a new image is provided, then upload it
		if (newImageFile instanceof File && newImageFile.size > 0) {
			const uploadResult = await uploadFile(newImageFile);

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
			if (oldImageUrl && oldImageUrl !== "/default-avatar.png") {
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

export const deleteUser = async (user_id: string): Promise<DeleteStateForm> => {
	const connection = await pool.connect();
	try {
		const user = await fetchUserById(user_id);
		if (!user) {
			return {
				message: "User not found",
				status: "error",
			};
		}
		const userImage = user.image_url;
		const session = await verifySession();
		const sqlQuery = `
				DELETE FROM users
				WHERE user_id = $1
				RETURNING *
				`;
		const values = [user_id];
		if (session?.user_id === user_id || session?.role === "admin") {
			if (userImage && userImage !== "/default-avatar.png") {
				// DELETE THE USER'S AVATAR
				await deleteFile(user.image_url);
			}

			await connection.query(sqlQuery, values);

			await connection.query("COMMIT");
			revalidatePath("/users");
			return {
				message: "User deleted successfully",
				status: "success",
			};
		}
		return {
			message: "Authorization Failed",
			status: "error",
		};
	} catch (error) {
		await connection.query("ROLLBACK");
		console.error(`ERROR DELETING A USER: ${error as Error}`);
		return {
			message: (error as Error).message,
			status: "error",
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};

const UpdateInfoSchema = CreateUserSchema.omit({ role: true, password: true });

export const updateInfo = async (
	prevState: UserFormState,
	formData: FormData,
): Promise<UserFormState> => {
	const validatedFields = UpdateInfoSchema.safeParse({
		user_name: formData.get("user_name"),
		email: formData.get("email"),
	});
	if (!validatedFields.success) {
		return {
			message: "Invalid input",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { user_name, email } = validatedFields.data;
	const newImageFile = formData.get("image_url") as File | null;

	// CONNECT TO THE DATABASE
	const connection = await pool.connect();
	try {
		const session = await verifySession();

		// FETCH THE CURRENT USER
		const user = await connection.query(
			`SELECT * FROM users WHERE user_id = $1;`,
			[session?.user_id],
		);

		// check if the user exist
		if (!user) {
			return {
				message: "User not found",
				errors: {
					other: ["User not found"],
				},
			};
		}

		let newImageUrl: string | null = null;
		// if a new image is provided, then upload it
		if (newImageFile instanceof File && newImageFile.size > 0) {
			const uploadResult = await uploadFile(newImageFile);
			if (!uploadResult.success) {
				return {
					errors: {
						image_url: [uploadResult.error!],
					},
					message: "failed to upload image",
				};
			}
			newImageUrl = uploadResult.filePath;

			// delete the old image
			const oldImageUrl = user.rows[0]?.image_url;
			if (oldImageUrl && oldImageUrl !== "/default-avatar.png") {
				await deleteFile(oldImageUrl);
			}
		}
		await connection.query("BEGIN");
		const sqlQuery = `
		UPDATE 
			users
		SET 
			user_name = $1, 
			email = $2, 
			image_url = COALESCE($3, image_url)
		WHERE 
			user_id = $4;
		`;
		const values = [user_name, email, newImageUrl, session?.user_id];
		await connection.query(sqlQuery, values);
		await connection.query("COMMIT");
		revalidatePath(`/profile/${user_name}`);
		return {
			message: "User updated successfully",
		};
	} catch (error) {
		await connection.query("ROLLBACK");
		console.error(`ERROR UPDATING INFO: ${error as Error}`);
		return {
			message: (error as Error).message,
			errors: {
				other: [(error as Error).message],
			},
		};
	} finally {
		// RELEASE THE CONNECTION
		connection.release();
	}
};
