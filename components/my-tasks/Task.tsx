import DeleteModal from "@/components/DeleteModal";
import { EditBtn } from "@/components/buttons";
import TaskStatus from "@/components/my-tasks/TaskStatus";
import { TaskTable } from "@/lib/definitions";
import Image from "next/image";

const Task = ({ task, edit_href }: { task: TaskTable; edit_href: string }) => {
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
				<p>{task.created_at?.toString().slice(4, 16)}</p>
			</div>
			<div className="flex w-full items-center justify-between pt-4">
				<div>
					<p className="text-xl font-medium">
						<span
							className={`${
								task.is_completed
									? "text-gray-300 line-through italic font-normal"
									: ""
							}`}>
							{task.title}
						</span>
					</p>
					<TaskStatus status={task.is_completed} />
				</div>
				<div className="flex justify-end gap-2">
					<EditBtn href={`/${edit_href}/${task.task_id}/edit`} />
					<DeleteModal label="Task" id={task.task_id} link={edit_href} />
				</div>
			</div>
		</div>
	);
};

export default Task;
