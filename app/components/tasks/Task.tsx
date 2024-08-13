import { TasksTable } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import TaskStatus from "./TaskStatus";

const Task = (task: TasksTable) => {
	return (
		<div className="mb-2 w-full rounded-md bg-gray-50 p-4">
			<div className="flex items-center justify-between border-b pb-4">
				<div>
					<div className="mb-2 flex items-center">
						<Image
							src={task.image_url}
							className="mr-2 rounded-full"
							height={28}
							width={28}
							alt="profile picture"
						/>
						<h2 className="text-lg font-bold">{task.user_name}</h2>
					</div>
					<p className="text-sm text-green-500">{task.email}</p>
				</div>
				<TaskStatus status={task.is_completed} />
			</div>
			<div className="flex w-full items-center justify-between pt-4">
				<div>
					<p className="text-xl font-medium">{task.title}</p>
					<p>{task.created_at?.toString().slice(4, 16)}</p>
				</div>
				<div className="flex justify-end gap-2">
					<Link
						href={`/tasks/${task.task_id}/edit`}
						className="rounded-md border p-2 hover:bg-emerald-100">
						<FaPencil className="w-5" />
					</Link>

					<form action={task.task_id}>
						<button className="rounded-md border p-2 hover:bg-emerald-100">
							<span className="sr-only">Delete</span>
							<FaTrashCan className="w-5" />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Task;
