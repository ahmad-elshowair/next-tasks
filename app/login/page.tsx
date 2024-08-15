import LoginForm from "@/app/components/LoginForm";

const LoginPage = () => {
	return (
		<section className="flex items-center justify-center md:h-screen">
			<section className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<LoginForm />
			</section>
		</section>
	);
};

export default LoginPage;
