import { fetchTaskById } from "@/app/actions/task";
import { fetchUsersForTasks } from "@/app/actions/user";
import EditTaskFormAdmin from "@/app/components/all-tasks/EditTaskFormAdmin";
import Breadcrumb from "@/app/components/BreadCrumb";

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
