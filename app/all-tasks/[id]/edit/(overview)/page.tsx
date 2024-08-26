import { fetchTaskById } from "@/app/actions/task";
import { fetchUsersForTasks } from "@/app/actions/user";
import Breadcrumb from "@/components/BreadCrumb";
import EditTaskFormAdmin from "@/components/all-tasks/EditTaskFormAdmin";
import { BreadSkeleton, FormSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

const EditTaskAdminPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const users = await fetchUsersForTasks();
	const task = await fetchTaskById(id);
	return (
		<section className="pt-20 pb-2 px-10">
			<Suspense fallback={<BreadSkeleton />}>
				<Breadcrumb
					breadcrumbs={[
						{
							label: "All Tasks",
							href: "/all-tasks",
						},
						{
							label: "Edit Task",
							href: "/all-tasks/create",
							active: true,
						},
					]}
				/>
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<EditTaskFormAdmin users={users} task={task} />
			</Suspense>
		</section>
	);
};

export default EditTaskAdminPage;
