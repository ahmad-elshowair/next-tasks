import { z } from "zod";

export type User = {
	user_id: string;
	user_name: string;
	email: string;
	password: string;
	image_url: string;
	role: "user" | "admin";
	created_at: string;
	updated_at: string;
};

export type Task = {
	task_id: string;
	title: string;
	is_completed: boolean;
	user_id: string;
	created_at: string;
	update_at: string;
};

export type TaskTable = {
	task_id: string;
	title: string;
	is_completed: boolean;
	created_at: string;
	email: string;
	user_name: string;
	image_url: string;
};

export type LatestTasks = {
	task_id: string;
	title: string;
	is_completed: boolean;
	user_name: string;
	email: string;
	image_url: string;
};

export type UserTable = {
	user_id: string;
	user_name: string;
	email: string;
	image_url: string;
	role: "user" | "admin";
	created_at: string;
	updated_at: string;
};

export type RegisterFormState = {
	message?: string | null;
	errors?: {
		user_name?: string[];
		email?: string[];
		password?: string[];
		other?: string[];
	};
};

export type LoginFormState = {
	message?: string | null;
	errors?: {
		email?: string[];
		password?: string[];
		other?: string[];
	};
};

export type SessionPayload = {
	user_id: string;
	user_name: string;
	image_url: string;
	expiresAt: Date;
	role: "user" | "admin";
};

export type UserTaskStateFrom = {
	message?: string | null;
	status: "success" | "error" | null;
	errors?: {
		title?: string[];
		is_completed?: string[];
	};
};

export type AdminTaskStateFrom = {
	message?: string | null;
	status: "success" | "error" | null;
	errors?: {
		title?: string[];
		user_id?: string[];
		is_completed?: string[];
	};
};
export type UserField = {
	user_id: string;
	user_name: string;
};

export type EditTaskFrom = {
	user_id: string;
	task_id: string;
	is_completed: boolean;
	title: string;
};

export type UserEditForm = {
	user_id: string;
	user_name: string;
	email: string;
	image_url: string;
	role: "user" | "admin";
};

export type UserFormState = {
	message?: string | null;
	errors?: {
		user_id?: string[];
		user_name?: string[];
		email?: string[];
		password?: string[];
		image_url?: string[];
		role?: string[];
		other?: string[];
	};
};

export type DeleteStateForm = {
	message?: string;
	status?: "error" | "success";
};

export const TaskSchema = z.object({
	task_id: z.string(),
	user_id: z.string({ invalid_type_error: "Please Select  a User" }),
	title: z.string().min(10, {
		message: "Please describe your task with at least 10 characters!",
	}),
	is_completed: z.boolean({
		invalid_type_error: "Please select the task status",
	}),
});

export const CreateUserSchema = z.object({
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
