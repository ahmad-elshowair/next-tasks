export type User = {
	user_id: string;
	user_name: string;
	email: string;
	password: string;
	image_url: string;
};

export type Task = {
	task_id: string;
	title: string;
	is_competed: boolean;
	user_id: string;
	created_at: string;
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
