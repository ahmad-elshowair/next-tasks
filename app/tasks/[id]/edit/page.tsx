import Breadcrumb from "@/app/components/BreadCrumb";
import EditForm from "@/app/components/tasks/EditForm";

const EditTaskPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	return (
		<main>
			<Breadcrumb
				breadcrumbs={[
					{ label: "Tasks", href: "/tasks" },
					{
						label: "Edit Task",
						href: `/tasks/${id}/edit`,
						active: true,
					},
				]}
			/>
			<EditForm />
		</main>
	);
};

export default EditTaskPage;
