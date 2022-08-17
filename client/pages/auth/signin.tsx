import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
	const { data, status } = useSession();

	const { id, role } =
		(data?.accessToken as
			| {
					id: string | null | undefined;
					role: string | undefined | null;
			  }
			| undefined
			| null) || {};

	useEffect(() => {
		if (status === "authenticated") {
			if (role) {
				switch (role) {
					case "Student":
						router.push(`/student/${id}`);
						break;
					case "ADMIN":
						router.push(`/user/${id}`);
						break;
					case "USER":
						router.push(`/user/${id}`);
						break;

					default:
						router.push("/");
						break;
				}
			}
		}
	}, [status]);

	const [userInfo, setUserInfo] = useState({ email: "", password: "" });
	const router = useRouter();
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		// validate your userinfo
		e.preventDefault();

		const result = await signIn("credentials", {
			email: userInfo.email,
			password: userInfo.password,
			redirect: false,
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
