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

export type TasksTable = {
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
	errors?: {
		title?: string[];
		other?: string[];
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
