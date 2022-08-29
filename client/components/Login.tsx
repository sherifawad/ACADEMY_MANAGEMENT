import Link from "next/link";
import React, { useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { getCsrfToken, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Paths from "core/paths";
import { AiFillGithub } from "react-icons/ai";

function Login({ setLogin }) {
	const router = useRouter();

	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const submitContact = async (e) => {
		try {
			e.preventDefault();
			if (loading) return;
			setLoading(true);

			const { error, ok, status } = await signIn("credentialsId", {
				redirect: false,
				email: formState.email,
				password: formState.password,
			});
			if (ok) {
				router.push(Paths.Home);
			} else if (error) {
				console.log("🚀 ~ file: Login.tsx ~ line 53 ~ submitContact ~ error", error);
			}
		} finally {
			setLoading(false);
		}
	};
	const gitHubLogIn = async (e) => {
		try {
			e.preventDefault();
			if (loading) return;
			setLoading(true);
			await signIn("githubLogin");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="container py-4 flex flex-col overflow-hidden
            mx-auto max-w-sm border rounded-2xl shadow-md shadow-slate-400"
		>
			<h1 className="font-bold text-2xl text-center pb-4">Login</h1>
			<form onSubmit={submitContact} className="flex flex-col gap-4">
				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="email" className="text-gray-700">
						Email
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<FaRegUser />
						</h3>
						<input
							id="email"
							name="email"
							className="flex-grow outline-none"
							type="email"
							required
							placeholder="Type your email"
							pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
							value={formState.email}
							onChange={(e) =>
								setFormState({
									...formState,
									email: e.target.value,
								})
							}
						/>
					</div>
				</div>
				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="password" className="text-gray-700">
						Password
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<BiLock />
						</h3>
						{/* password must contain 1 number (0-9) password must contain 1 uppercase letters
							password must contain 1 lowercase letters password must contain 1 non-alpha
							numeric number password is 8-16 characters with no space */}
						<input
							id="password"
							name="password"
							className=" flex-grow outline-none"
							type="password"
							placeholder="Password  @Qw1"
							required
							// pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"          value={formState.password}
							onChange={(e) =>
								setFormState({
									...formState,
									password: e.target.value,
								})
							}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-gradient-to-r from-cyan-300 to-fuchsia-700 rounded-full text-white p-1 hover:bg-gradient-to-r hover:from-fuchsia-700 hover:to-cyan-300"
				>
					LOGIN
				</button>
			</form>
			<div className="flex items-center justify-center space-x-2 my-5">
				<span className="h-px w-full bg-gray-700"></span>
				<span className="font-semibold text-gray-400">OR</span>
				<span className="h-px w-full bg-gray-700"></span>
			</div>
			<div className="flex">
				<button
					className="mr-5 bg-gray-200  hover:bg-slate-500 border border-gray-400  text-blue-600 font-bold py-2 px-6 rounded-lg children:hover:text-white"
					onClick={gitHubLogIn}
				>
					<AiFillGithub className="text-black" />
				</button>
			</div>
			{/* <Link href="#">
				<a className="text-end py-4 text-slate-500">Forget Password</a>
			</Link>

			<a onClick={() => setLogin(false)} className="text-center py-4 text-slate-500 cursor-pointer">
				SIGN UP
			</a> */}
		</div>
	);
}

export default Login;
