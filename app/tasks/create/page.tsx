import Breadcrumb from "@/app/components/BreadCrumb";
import CreateForm from "@/app/components/tasks/CreateForm";

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
