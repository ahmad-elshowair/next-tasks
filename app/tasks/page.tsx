import TasksTable from "../ui/tasks/TasksTable";

const TasksPage = ({
	searchParams,
}: {
	searchParams?: { query?: string; page?: number };
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	return (
		<main className="p-4 w-full">
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Tasks</h1>
			<section className="flex items-center justify-between gap-2">
				{/* <Search/> */}
				{/* <CreateTask/> */}
			</section>
			<TasksTable query={query} currentPage={currentPage} />
			<section className="mt-5 flex w-full justify-center">
				{/* <Pagination/> */}
			</section>
		</main>
	);
};

export default TasksPage;
