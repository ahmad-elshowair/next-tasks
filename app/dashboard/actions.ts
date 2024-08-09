import pool from "@/app/lib/pool";

export const fetchCardData = async () => {
	const client = await pool.connect();
	try {
		const totalUsers = await client.query(`SELECT COUNT(*) FROM users`);
		const totalTasks = await client.query(`SELECT COUNT(*) FROM tasks`);
		const tasksStatus = await client.query(`
            SELECT 
                COUNT(CASE WHEN is_completed THEN 1 END) AS "done",
                COUNT(CASE WHEN NOT is_completed THEN 1 END) AS "not"
            FROM tasks`);
		const data = await Promise.all([totalUsers, totalTasks, tasksStatus]);

		const numberOfUsers = Number(data[0].rows[0].count ?? "0");
		const numberOfTasks = Number(data[1].rows[0].count ?? "0");
		const numberOfDoneTasks = Number(data[2].rows[0].done ?? "0");
		const numberOfNotDoneTasks = Number(data[2].rows[0].not ?? "0");
		return {
			numberOfUsers,
			numberOfTasks,
			numberOfDoneTasks,
			numberOfNotDoneTasks,
		};
	} catch (error) {
		console.error("Database Error: ", (error as Error).message);
		throw error;
	} finally {
		client.release();
	}
};
