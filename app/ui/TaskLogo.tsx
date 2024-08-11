import Link from "next/link";
import { GoTasklist } from "react-icons/go";

const TaskLogo = () => {
	return (
		<div className="flex flex-row leading-none items-center">
			<GoTasklist className="h-12 w-12 text-emerald-800" />
			<h1 className={`text-[44px] font-bold text-neutral-900`}>
				<Link href="/">Tasks</Link>
			</h1>
		</div>
	);
};

export default TaskLogo;
