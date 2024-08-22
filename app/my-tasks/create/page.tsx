import Breadcrumb from "@/components/BreadCrumb";
import CreateUserTaskForm from "@/components/my-tasks/CreateUserTaskForm";

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
			<CreateUserTaskForm />
		</section>
	);
};

export default CreateTaskPageUser;
