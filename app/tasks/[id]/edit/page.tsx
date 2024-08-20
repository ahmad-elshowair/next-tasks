import { fetchTaskById } from "@/app/actions/task";
import Breadcrumb from "@/app/components/BreadCrumb";
import EditForm from "@/app/components/tasks/EditForm";

const EditTaskPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const task = await fetchTaskById(id);
	return (
		<section className="px-10 pt-20 pb-2">
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
			<EditForm {...task} />
		</section>
	);
};

export default EditTaskPage;
