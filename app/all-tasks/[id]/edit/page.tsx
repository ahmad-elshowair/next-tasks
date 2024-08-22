import { fetchTaskById } from "@/app/actions/task";
import { fetchUsersForTasks } from "@/app/actions/user";
import Breadcrumb from "@/components/BreadCrumb";
import EditTaskFormAdmin from "@/components/all-tasks/EditTaskFormAdmin";

const EditTaskAdminPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const users = await fetchUsersForTasks();
	const task = await fetchTaskById(id);
	return (
		<section className="pt-20 pb-2 px-10">
			<Breadcrumb
				breadcrumbs={[
					{
						label: "All Tasks",
						href: "/all-tasks",
					},
					{
						label: "Edit Task",
						href: "/all-tasks/create",
						active: true,
					},
				]}
			/>
			<EditTaskFormAdmin users={users} task={task} />
		</section>
	);
};

export default EditTaskAdminPage;
