import clsx from "clsx";
import { FaCircleCheck, FaClock } from "react-icons/fa6";

const TaskStatus = ({ status }: { status: boolean }) => {
	return (
		<span
			className={clsx(
				"inline-flex items-center rounded-full px-2 py-1 text-xs",
				{
					"bg-green-200 text-green-800": status,
					"bg-emerald-50 text-emerald-800": !status,
				},
			)}>
			{status ? (
				<>
					<span className="inline mr-1">Done</span>
					<FaCircleCheck className="w-4" />
				</>
			) : (
				<>
					<span className="inline mr-1">Not Yet</span>
					<FaClock className="w-4" />
				</>
			)}
		</span>
	);
};

export default TaskStatus;
