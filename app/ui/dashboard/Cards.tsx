import { fetchCardData } from "@/app/dashboard/actions";
import { FaCircleCheck, FaClock, FaListCheck, FaUsers } from "react-icons/fa6";

const iconMap = {
	done: FaCircleCheck,
	not: FaClock,
	users: FaUsers,
	tasks: FaListCheck,
};

export const CardWrapper = async () => {
	const {
		numberOfDoneTasks,
		numberOfNotDoneTasks,
		numberOfTasks,
		numberOfUsers,
	} = await fetchCardData();
	return (
		<>
			<Card title="Users" value={numberOfUsers} type="users" />
			<Card title="Tasks" value={numberOfTasks} type="tasks" />
			<Card title="Done Task" value={numberOfDoneTasks} type="done" />
			<Card title="Not Yet" value={numberOfNotDoneTasks} type="not" />
		</>
	);
};

const Card = ({
	title,
	value,
	type,
}: {
	title: string;
	value: number | string;
	type: "users" | "tasks" | "done" | "not";
}) => {
	const Icon = iconMap[type];
	return (
		<div className="rounded-xl bg-emerald-50 p-2 shadow-sm">
			<div className="flex p-4">
				{Icon ? <Icon className="text-emerald-700 w-5 h-5" /> : null}
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
				{value}
			</p>
		</div>
	);
};
