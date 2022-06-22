import { SIGN_UP_MUTATION } from "core/mutations/userMutations";
import React, { useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { useMutation } from "react-query";

function Register({ setLogin }) {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		name: "",
		avatar: "",
		confirmPassword: "",
		phone: "",
		parentsPhones: "",
		address: "",
		error: "",
	});

	const { data, error } = useMutation(SIGN_UP_MUTATION);
	const submitContact = async (e) => {
		e.preventDefault();
		// if password not equal confirmPassword return
		if (formState.confirmPassword !== formState.password) {
			setFormState({
				...formState,
				error: "Password Mismatch",
			});
			return;
		}
		// await signup({
		// 	variables: {
		// 		email: formState.email,
		// 		password: formState.password,
		// 		name: formState.name,
		// 		avatar: formState.avatar,
		// 		phone: formState.phone,
		// 		address: formState.address,
		// 		parentsPhones: formState.parentsPhones,
		// 	},
		// });
	};
	return (
		<div
			className="container py-4 flex flex-col overflow-hidden
            mx-auto max-w-sm border rounded-2xl shadow-md shadow-slate-400"
		>
			<h1 className="font-bold text-2xl text-center pb-4">SIGN UP</h1>
			<form onSubmit={submitContact} className="flex flex-col gap-4">
				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="name" className="text-gray-700">
						Name
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<FaRegUser />
						</h3>
						<input
							id="name"
							name="name"
							className="flex-grow outline-none"
							type="text"
							placeholder="Type your name"
							value={formState.name}
							onChange={(e) =>
								setFormState({
									...formState,
									error: "",
									name: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="email" className="text-gray-700">
						Email
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<GoMail />
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
									error: "",
									email: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="phone" className="text-gray-700">
						Phone
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<GoMail />
						</h3>
						<input
							id="phone"
							name="phone"
							className="flex-grow outline-none"
							type="phone"
							required
							placeholder="Type your phone"
							value={formState.phone}
							onChange={(e) =>
								setFormState({
									...formState,
									error: "",
									phone: e.target.value,
								})
							}
						/>
					</div>
				</div>
				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="parentPhone" className="text-gray-700">
						ParentPhone
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<GoMail />
						</h3>
						<input
							id="parentPhone"
							name="parentPhone"
							className="flex-grow outline-none"
							type="phone"
							required
							placeholder="Type your parentPhone"
							value={formState.parentsPhones}
							onChange={(e) =>
								setFormState({
									...formState,
									error: "",
									parentsPhones: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="address" className="text-gray-700">
						Address
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<GoMail />
						</h3>
						<input
							id="address"
							name="address"
							className="flex-grow outline-none"
							type="text"
							required
							placeholder="Type your address"
							value={formState.address}
							onChange={(e) =>
								setFormState({
									...formState,
									error: "",
									address: e.target.value,
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
									error: "",
									password: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className="flex flex-col px-4 gap-2">
					<label htmlFor="confirmPassword" className="text-gray-700">
						confirmPassword
					</label>
					<div className="account-input">
						<h3 className="plb-2 pli-4">
							<BiLock />
						</h3>
						{/* password must contain 1 number (0-9) password must contain 1 uppercase letters
							password must contain 1 lowercase letters password must contain 1 non-alpha
							numeric number password is 8-16 characters with no space */}
						<input
							id="confirmPassword"
							name="confirmPassword"
							className=" flex-grow outline-none"
							type="password"
							placeholder="Password  @Qw1"
							required
							// pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
							value={formState.confirmPassword}
							onChange={(e) =>
								setFormState({
									...formState,
									error: "",
									confirmPassword: e.target.value,
								})
							}
						/>
					</div>
					{formState.error?.length > 0 && <p className="text-red-600">{formState.error}</p>}
				</div>
				<button
					type="submit"
					className="bg-gradient-to-r from-cyan-300 to-fuchsia-700 rounded-full text-white p-1 hover:bg-gradient-to-r hover:from-fuchsia-700 hover:to-cyan-300"
				>
					SIGN UP
				</button>
			</form>

			<a onClick={() => setLogin(true)} className="text-center py-4 text-slate-500 cursor-pointer">
				LOGIN
			</a>
			{/* {loading && <h1>loading.......</h1>} */}
		</div>
	);
}

export default Register;
