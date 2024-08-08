import { fetchTasksPages } from "@/app/tasks/actions";
import Pagination from "@/app/ui/Pagination";
import Search from "@/app/ui/Search";
import { CreateTask } from "@/app/ui/tasks/buttons";
import TasksTable from "@/app/ui/tasks/TasksTable";

const TasksPage = async ({
	searchParams,
}: {
	searchParams?: { query?: string; page?: number };
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchTasksPages(query);

	console.log(totalPages);

	return (
		<main className="p-4 w-full">
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Tasks</h1>
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search Task..." />
				<CreateTask />
			</section>
			<TasksTable query={query} currentPage={currentPage} />
			<section className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</section>
		</main>
	);
};

export default TasksPage;
