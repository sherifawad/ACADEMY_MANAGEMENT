import Paths from "core/paths";
import useAuth from "customHooks/useAuth";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
	const { user } = useAuth();

	useEffect(() => {
		if (user?.id && user?.role) {
			router.push(`${Paths.STUDENT}`);
		}
	}, [user?.id, user?.role]);

	const [userInfo, setUserInfo] = useState({ email: "", password: "" });
	const router = useRouter();
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		// validate your userinfo
		e.preventDefault();

		const result = await signIn("credentials", {
			email: userInfo.email,
			password: userInfo.password,
			redirect: false,
			callbackUrl: Paths.SignIn,
		});
	};
	return (
		<div className="sign-in-form">
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<input
					value={userInfo.email}
					onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
					type="email"
					placeholder="john@email.com"
				/>
				<input
					value={userInfo.password}
					onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
					type="password"
					placeholder="********"
				/>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
};

export default SignIn;
