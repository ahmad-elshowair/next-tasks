import Breadcrumb from "@/app/ui/BreadCrumb";
import CreateForm from "@/app/ui/tasks/CreateForm";

const CreateTask = () => {
	return (
		<main>
			<Breadcrumb
				breadcrumbs={[
					{
						label: "Tasks",
						href: "/tasks",
					},
					{
						label: "Create Task",
						href: "/tasks/create",
						active: true,
					},
				]}
			/>
			<CreateForm />
		</main>
	);
};

export default CreateTask;
