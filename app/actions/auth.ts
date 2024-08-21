"use server";
import pool from "@/app/lib/pool";
import { hash, isMatch } from "@/app/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LoginFormState, RegisterFormState } from "../lib/definitions";
import { createSession, deleteSession } from "../lib/session";
import { fetchUserByEmail } from "./user";

const RegisterSchema = z.object({
	user_name: z
		.string()
		.min(2, { message: "user name must be at least 2 characters long!" })
		.trim(),
	email: z.string().email({ message: "invalid email address" }).trim(),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long" })
		.regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
		.regex(/[0-9]/, { message: "Contain at least one number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least one special character!",
		})
		.trim(),
});

export const register = async (
	prevState: RegisterFormState,
	formData: FormData,
): Promise<RegisterFormState> => {
	// validate form fields
	const validatedFields = RegisterSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		user_name: formData.get("user_name"),
	});

	// if any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields, Failed to Register",
		};
	}

	// prepare data for insertion into database
	const { user_name, email, password } = validatedFields.data;
	const hashedPassword: string = hash(password);

	// check if the email exist
	const user = await fetchUserByEmail(email);
	if (user) {
		return {
			errors: { email: ["Email already exist"] },
			message: "Email already exist",
		};
	}
	// create a user
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		const result = await client.query(
			`INSERT INTO users (user_name, email, password)
            VALUES ($1, $2, $3) RETURNING *`,
			[user_name, email, hashedPassword],
		);
		await client.query("COMMIT");
		const user = result.rows[0];
		// CREATE USER SESSION
		await createSession({
			user_id: user.user_id,
			user_name: user.user_name,
			image_url: user.image_url,
			role: user.role,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		// REDIRECT USER TO Tasks
		redirect("/my-tasks");
	} catch (error) {
		await client.query("ROLLBACK");
		console.error(`ERROR REGISTERING A USER: ${error as Error}`);
		return {
			errors: { email: [(error as Error).message] },
			message: "Failed to Register",
		};
	} finally {
		client.release();
	}
};

const LoginSchema = z.object({
	email: z.string().email({ message: "invalid email address" }).trim(),
	password: z
		.string()
		.min(1, { message: "Password ,must not be empty" })
		.trim(),
});
export const login = async (
	prevState: LoginFormState,
	formData: FormData,
): Promise<LoginFormState> => {
	// VALIDATE FORM FIELDS
	const validatedFields = LoginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});
	// IF ANY FORM FIELDS ARE INVALID, RETURN EARLY
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields, Failed to Login",
		};
	}
	// PREPARE DATA
	const { email, password } = validatedFields.data;

	// CHECK IF THE EMAIL EXIST
	const user = await fetchUserByEmail(email);

	// IF THE USER DOES NOT EXIST, RETURN EARLY
	if (!user) {
		return {
			errors: { email: ["EMAIL IS NOT EXIST!"] },
			message: "EMAIL IS NOT EXIST!",
		};
	}

	// IF THE PASSWORD IS INCORRECT, RETURN EARLY
	const isPasswordCorrect = isMatch(password, user.password);
	if (!isPasswordCorrect) {
		return {
			errors: { password: ["PASSWORD IS INCORRECT!"] },
			message: "PASSWORD IS INCORRECT!",
		};
	}

	// IF LOGIN SUCCESSFUL, CREATE A SESSION FOR THE USER AND REDIRECT TO THE DASHBOARD
	await createSession({
		user_id: user.user_id,
		user_name: user.user_name,
		image_url: user.image_url,
		role: user.role,
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	});

	// REDIRECT TO Tasks
	redirect("/my-tasks");
};

export const logout = async () => {
	deleteSession();
	redirect("/");
};
