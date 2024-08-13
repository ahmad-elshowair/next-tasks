import { CardWrapper } from "@/app/components/dashboard/Cards";
import LatestTasks from "@/app/components/dashboard/LatestTasks";
import { CardsSkeleton, LatestTasksSkeleton } from "@/app/components/skeletons";
import { Suspense } from "react";

const Dashboard = () => {
	return (
		<section className="flex w-full flex-col">
			<h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
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
