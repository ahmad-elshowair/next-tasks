import { fetchUserById } from "@/app/actions/user";
import AccountTab from "@/components/profile/AccountTab";

const Profile = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const user = await fetchUserById(id);

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<section className="pt-20 pb-2 px-10 w-full">
			<h1 className="text-3xl font-bold uppercase mb-4 md:mb-8">
				{user.user_name}
			</h1>
			<AccountTab user={user} />
		</section>
	);
};

export default Profile;
