import { IconButton, PrimaryButton } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import InputWithLabel from "@/components/ui/InputWithLabel";
import Label from "@/components/ui/Label";
import LinkAsButton from "@/components/ui/LinkAsButton";
import SubGraph from "@/components/ui/SubGraph";
import { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
	const [userInfo, setUserInfo] = useState({ name: "", password: "" });
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		// validate your userinfo
		e.preventDefault();

		const res = await signIn("credentials", {
			name: userInfo.name,
			password: userInfo.password,
			redirect: false,
		});

		console.log(res);
	};

	const handleGitHubSignIn = async () => {
		const res = await signIn("github", {
			redirect: false,
		});
		console.log(res);
	};

	const handleLogout = async () => {
		await signOut({
			callbackUrl: "http://localhost:3000/",
		});
	};
	return (
		<Card>
			<h1>الماركة</h1>
			<form onSubmit={handleSubmit} className="mt-6">
				<InputWithLabel
					label="الاسم"
					value={userInfo.name}
					onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })}
					type="text"
					placeholder="شريف"
				/>
				<div className="mt-4">
					<div className="flex items-center justify-between">
						<Label htmlFor="password" title="كلمة السر" />

						<a href="#">نسيت كلمة السر؟</a>
					</div>
					<Input
						value={userInfo.password}
						onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
						type="password"
						placeholder="********"
					/>
				</div>
				<div className="mt-6">
					<PrimaryButton
						type="submit"
						className="w-full bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600"
					>
						الدخول
					</PrimaryButton>
				</div>
			</form>
			<div className="flex items-center justify-between mt-4">
				<span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

				<a href="#">أو سجل الدخول باستخدام</a>

				<span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
			</div>

			<div className="flex items-center mt-6 -mx-2">
				<IconButton type="button" onClick={handleGitHubSignIn}>
					<span className="hidden mx-2 sm:inline">تسجيل الدخول باستخدام جوجل</span>
					<svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
						<path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
					</svg>
				</IconButton>

				<LinkAsButton href="#">
					<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
						<path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
					</svg>
				</LinkAsButton>
			</div>

			<SubGraph>
				لا تملك حساب
				<a href="#" className="font-medium mx-1">
					سجل
				</a>
			</SubGraph>
		</Card>
	);
};

export default SignIn;
