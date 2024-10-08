import { CardWrapper } from "@/components/dashboard/Cards";
import LatestTasks from "@/components/dashboard/LatestTasks";
import { CardsSkeleton, LatestTasksSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

const Dashboard = () => {
	return (
		<section className="flex w-full flex-col px-10 py-2">
			<h1 className="md:mt-20 mb-4 text-xl md:text-2xl font-bold">Dashboard</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<CardWrapper />
				</Suspense>
			</div>
			<div className="mt-6 flex min-w-full items-center justify-center">
				<Suspense fallback={<LatestTasksSkeleton />}>
					<LatestTasks />
				</Suspense>
			</div>
		</section>
	);
};

export default Dashboard;
