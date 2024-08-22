import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
	return (
		<section className="flex items-center justify-center md:h-screen">
			<section className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<RegisterForm />
			</section>
		</section>
	);
};

export default RegisterPage;
