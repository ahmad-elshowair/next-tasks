import { fetchUsersForTasks } from "@/app/actions/user";
import CreateTaskFormAdmin from "@/components/all-tasks/CreateTaskFormAdmin";
import Breadcrumb from "@/components/BreadCrumb";

const CreateTaskAdminPage = async () => {
	const users = await fetchUsersForTasks();
	return (
		<section className="pt-20 pb-2 px-10">
			<Breadcrumb
				breadcrumbs={[
					{
						label: "All Tasks",
						href: "/all-tasks",
					},
					{
						label: "Create Task",
						href: "/all-tasks/create",
						active: true,
					},
				]}
			/>
			<CreateTaskFormAdmin users={users} />
		</section>
	);
};

export default CreateTaskAdminPage;
