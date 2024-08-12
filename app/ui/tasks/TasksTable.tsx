import { DeleteBtn, EditBtn } from "@/app/ui/buttons";
import Task from "@/app/ui/tasks/Task";
import TaskStatus from "@/app/ui/tasks/TaskStatus";
import Image from "next/image";

const TasksTable = ({
	tasks,
}: {
	tasks: Array<{
		task_id: string;
		title: string;
		is_completed: boolean;
		created_at: string;
		email: string;
		user_name: string;
		image_url: string;
	}>;
}) => {
	return (
		<section className="mt-6 flow-root">
			{/* tasks in the in small screens  */}
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-emerald-100 p-2 md:mt-0">
					<div className="md:hidden">
						{tasks.length > 0 ? (
							tasks.map((task) => <Task key={task.task_id} {...task} />)
						) : (
							<p className="text-4xl text-red-100 border rounded-md p-4 bg-red-200">
								No tasks found
							</p>
						)}
					</div>
					<table className="hidden md:table min-w-full text-emerald-900">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									User
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Email
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Title
								</th>

								<th scope="col" className="px-4 py-5 font-medium">
									Date
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Status
								</th>
								<th scope="col" className=" relative px-4 py-5 font-medium">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{tasks.map((task) => (
								<tr
									key={task.task_id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
									<td className="py-3 pl-6 pr-3 whitespace-nowrap text-xs">
										<div className="flex items-center gap-1">
											<Image
												src={task.image_url}
												className="mr-2 rounded-full"
												height={28}
												width={28}
												alt="profile picture"
											/>
											<p className="font-semibold text-emerald-800">
												{task.user_name}
											</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-emerald-800">
										{task.email}
									</td>
									<td className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-emerald-800">
										{task.title}
									</td>
									<td className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-emerald-800">
										{task.created_at?.toString().slice(4, 16)}
									</td>
									<td className="whitespace-nowrap px-3 py-3 font-semibold text-emerald-800">
										<TaskStatus status={task.is_completed} />
									</td>
									<td className="whitespace-nowrap px-3 ">
										<div className="py-3 flex items-center gap-3">
											<EditBtn href={`/tasks/${task.task_id}/edit`} />
											<form action={task.task_id}>
												<DeleteBtn />
											</form>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default TasksTable;
