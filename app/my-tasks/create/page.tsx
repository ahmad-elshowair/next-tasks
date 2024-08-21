import Breadcrumb from "@/app/components/BreadCrumb";
import CreateTaskFormUser from "@/app/components/my-tasks/CreateTaskFormUser";

const CreateTaskPageUser = () => {
	return (
		<section className="pt-20 pb-2 px-10">
			<Breadcrumb
				breadcrumbs={[
					{
						label: "My Tasks",
						href: "/my-tasks",
					},
					{
						label: "Create Task",
						href: "/my-tasks/create",
						active: true,
					},
				]}
			/>
			<CreateTaskFormUser />
		</section>
	);
};

export default CreateTaskPageUser;
