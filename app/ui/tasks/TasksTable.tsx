import { fetchFilteredTasks } from "@/app/tasks/actions";
import Image from "next/image";
import Link from "next/link";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Task from "./Task";
import TaskStatus from "./TaskStatus";

const TasksTable = async ({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) => {
	const tasks = await fetchFilteredTasks(query, currentPage);
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
									<td
										className="py-3 pl-6 pr-3 whitespace-nowrap text-sm font-medium text-gray 
										">
										<div className="flex items-center gap-3">
											<Image
												src={task.image_url}
												className="mr-2 rounded-full"
												height={28}
												width={28}
												alt="profile picture"
											/>
											<p>{task.user_name}</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3">{task.email}</td>
									<td className="whitespace-nowrap px-3 py-3">{task.title}</td>
									<td className="whitespace-nowrap px-3 py-3">
										{task.created_at?.toString().slice(4, 16)}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										<TaskStatus status={task.is_completed} />
									</td>
									<td className="whitespace-nowrap px-3 ">
										<div className="py-3 flex items-center gap-3">
											<Link
												href={`/tasks/${task.task_id}/edit`}
												className="rounded-md border p-2 hover:bg-green-600">
												<FaPencil className="w-5 hover:text-green-200 " />
											</Link>

											<form action={task.task_id}>
												<button className="rounded-md border p-2 hover:bg-red-200">
													<span className="sr-only">Delete</span>
													<FaTrashCan className="w-5 text-red-600" />
												</button>
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
