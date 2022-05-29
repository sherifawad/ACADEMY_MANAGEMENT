import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import React, { useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

const LOGIN_MUTATION = gql`
	mutation Mutation($email: String!, $password: String!) {
		userLogin(email: $email, password: $password) {
			token
		}
	}
`;

function Login({ setLogin }) {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});

	const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
	const submitContact = async (e) => {
		e.preventDefault();
		await login({ variables: { email: formState.email, password: formState.password } });
	};
	return (
		<div
			className="container py-4 flex flex-col overflow-hidden
            mx-auto w-2/5 border rounded-2xl shadow-md shadow-slate-400"
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
			<Link href="#">
				<a className="text-end py-4 text-slate-500">Forget Password</a>
			</Link>

			<a onClick={() => setLogin(false)} className="text-center py-4 text-slate-500">
				SIGN UP
			</a>
			{loading && <h1>loading.......</h1>}
		</div>
	);
}

export default Login;
