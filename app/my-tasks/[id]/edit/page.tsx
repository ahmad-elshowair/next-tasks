import { fetchTaskById } from "@/app/actions/task";
import Breadcrumb from "@/app/components/BreadCrumb";
import EditTaskFormUser from "@/app/components/my-tasks/EditTaskFormUser";

const EditTaskPage = async ({ params }: { params: { id: string } }) => {
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
			<EditTaskFormUser {...task} />
		</section>
	);
};

export default EditTaskPage;
