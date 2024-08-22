import { fetchFilteredMyTasks, fetchMyTasksPages } from "@/app/actions/task";
import { CreateBtn } from "@/components/buttons";
import TasksTable from "@/components/my-tasks/TasksTable";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { TasksTableSkeleton } from "@/components/skeletons";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Tasks Page",
	description:
		"Tasks page to manage tasks which deleting, fetching, creating, and updating tasks",
};

const MyTasksPage = async ({
	searchParams,
}: {
	searchParams?: { query?: string; page?: number };
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchMyTasksPages(query);
	const tasks = await fetchFilteredMyTasks(query, currentPage);

	return (
		<main className="py-2 px-10 w-full">
			<h1 className="md:mt-20 text-3xl font-bold mb-4 md:mb-8">Tasks</h1>
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search Task..." />
				<CreateBtn href="/my-tasks/create" label="Create Take" />
			</section>
			<Suspense key={query + currentPage} fallback={<TasksTableSkeleton />}>
				<TasksTable tasks={tasks} edit_href="my-tasks" />
			</Suspense>
			<section className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</section>
		</main>
	);
};

export default MyTasksPage;
