import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

export const CreateTask = () => {
	return (
		<Link
			href={"/tasks/create"}
			className="flex gap-2 items-center h-10 rounded-lg bg-green-500 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-500 focus-visible:outline-green-600 hover:bg-green-600 hover:text-green-50 duration-200 ease-in-out">
			<span className="hidden md:inline">Create Task</span>
			<FaPlus className="h-5" />
		</Link>
	);
};
