import { GoTasklist } from "react-icons/go";

const TaskLogo = ({ fontSize }: { fontSize: string }) => {
	return (
		<div className="flex flex-row leading-none items-center">
			<GoTasklist className="h-12 w-12 text-green-800" />
			<h1 className={`${fontSize} font-bold text-neutral-900`}>Tasks</h1>
		</div>
	);
};

export default TaskLogo;
