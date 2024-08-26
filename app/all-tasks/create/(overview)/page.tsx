import { fetchUsersForTasks } from "@/app/actions/user";
import CreateTaskFormAdmin from "@/components/all-tasks/CreateTaskFormAdmin";
import Breadcrumb from "@/components/BreadCrumb";
import { BreadSkeleton, FormSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

const CreateTaskAdminPage = async () => {
	const users = await fetchUsersForTasks();
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
							label: "Create Task",
							href: "/all-tasks/create",
							active: true,
						},
					]}
				/>
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<CreateTaskFormAdmin users={users} />
			</Suspense>
		</section>
	);
};

export default CreateTaskAdminPage;
