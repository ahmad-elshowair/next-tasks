import { fetchFilteredTasks, fetchTasksPages } from "@/app/actions/task";
import { CreateBtn } from "@/app/components/buttons";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { TasksTableSkeleton } from "@/app/components/skeletons";
import TasksTable from "@/app/components/tasks/TasksTable";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Tasks Page",
	description:
		"Tasks page to manage tasks which deleting, fetching, creating, and updating tasks",
};

const TasksPage = async ({
	searchParams,
}: {
	searchParams?: { query?: string; page?: number };
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchTasksPages(query);
	const tasks = await fetchFilteredTasks(query, currentPage);

	return (
		<main className="py-2 px-10 w-full">
			<h1 className="md:mt-20 text-3xl font-bold mb-4 md:mb-8">Tasks</h1>
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search Task..." />
				<CreateBtn href="/tasks/create" label="Create Take" />
			</section>
			<Suspense key={query + currentPage} fallback={<TasksTableSkeleton />}>
				<TasksTable tasks={tasks} />
			</Suspense>
			<section className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</section>
		</main>
	);
};

export default TasksPage;
