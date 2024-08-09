import { CardWrapper } from "@/app/ui/dashboard/Cards";

const Dashboard = () => {
	return (
		<section className="flex w-full flex-col">
			<h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<CardWrapper />
			</div>
			<div className="mt-6 flex min-w-full items-center justify-center">
				{/* <LatestTasks/>  */}
			</div>
		</section>
	);
};

export default Dashboard;
