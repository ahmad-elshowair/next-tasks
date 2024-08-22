import { fetchTaskById } from "@/app/actions/task";
import Breadcrumb from "@/components/BreadCrumb";
import EditUserTaskForm from "@/components/my-tasks/EditUserTaskForm";

const EditUserTaskPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const task = await fetchTaskById(id);
	return (
		<section className="px-10 pt-20 pb-2">
			<Breadcrumb
				breadcrumbs={[
					{ label: "My Tasks", href: "/my-tasks" },
					{
						label: "Edit Task",
						href: `/my-tasks/${id}/edit`,
						active: true,
					},
				]}
			/>
			<EditUserTaskForm {...task} />
		</section>
	);
};

export default EditUserTaskPage;
