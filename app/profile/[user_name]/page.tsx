import { fetchUserByUserName } from "@/app/actions/user";
import AccountTab from "@/components/profile/AccountTab";

const Profile = async ({ params }: { params: { user_name: string } }) => {
	const { user_name } = params;
	const user = await fetchUserByUserName(user_name);
	return (
		<section className="pt-20 pb-2 px-10 w-full">
			<h1 className="text-3xl font-bold uppercase mb-4 md:mb-8">
				{user.user_name}
			</h1>
			{/* <UserFrom user={user} /> */}
			<AccountTab user={user} />
		</section>
	);
};

export default Profile;
