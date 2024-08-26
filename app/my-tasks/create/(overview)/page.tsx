import Breadcrumb from "@/components/BreadCrumb";
import CreateUserTaskForm from "@/components/my-tasks/CreateUserTaskForm";
import { BreadSkeleton, FormSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

const CreateTaskPageUser = () => {
	return (
		<section className="pt-20 pb-2 px-10">
			<Suspense fallback={<BreadSkeleton />}>
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
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<CreateUserTaskForm />
			</Suspense>
		</section>
	);
};

export default CreateTaskPageUser;
