import Breadcrumb from "@/app/components/BreadCrumb";
import CreateForm from "@/app/components/tasks/CreateForm";

const CreateTask = () => {
	return (
		<section className="pt-20 pb-2 px-10">
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
		</section>
	);
};

export default CreateTask;
