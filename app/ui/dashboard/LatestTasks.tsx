import { fetchLatestTasks } from "@/app/dashboard/actions";
import clsx from "clsx";
import Image from "next/image";
import { FaClockRotateLeft } from "react-icons/fa6";
import TaskStatus from "../tasks/TaskStatus";

const LatestTasks = async () => {
	const latestTasks = await fetchLatestTasks();
	return (
		<div className="flex w-full flex-col md:col-span-4">
			<h2 className="mb-4 text-xl md:text-2xl">Latest Tasks</h2>
			<div className="flex flex-col justify-between rounded-xl bg-emerald-50 p-4">
				<div className="bg-white px-6 rounded-md">
					{latestTasks.length > 0 ? (
						<>
							{latestTasks.map((task, index) => (
								<div
									key={task.task_id}
									className={clsx(
										"flex flex-row items-center justify-between py-4 gap-2",
										{
											"border-t": index !== 0,
										},
									)}>
									<div className="flex items-center">
										<Image
											src={task.image_url}
											className="mr-4 rounded-full"
											height={32}
											width={32}
											alt={`${task.user_name}'s Profile`}
										/>
										<div className="flex flex-col ">
											<p className="truncate text-sm font-medium md:text-base">
												{task.user_name}
											</p>
											<p className="truncate text-sm font-normal text-emerald-300 hidden md:block">
												{task.email}
											</p>
										</div>
									</div>
									<p className="text-sm ">{task.title}</p>
									<TaskStatus status={task.is_completed} />
								</div>
							))}
						</>
					) : (
						<p className="text-gray-500">No tasks available</p>
					)}
				</div>
				<div className="flex items-center pb-2 pt-2 mt-8">
					<FaClockRotateLeft className="h-5 w-5 text-emerald-500" />
					<h3 className="ml-2 text-lg text-emerald-500">Updated Now</h3>
				</div>
			</div>
		</div>
	);
};

export default LatestTasks;
