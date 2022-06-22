import React from "react";
import GradeGroupSelect from "./GradeGroupSelect";

function AddStudent({ onProceed, onClose }) {
	const proceedAndClose = () => {
		onProceed();
		onClose();
	};
	return (
		<form method="dialog" className="space-y-6" action="#">
			<div>
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="name@company.com"
				/>
			</div>

			<div>
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Sherif Mohammed"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="phone"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your Phone
				</label>
				<input
					type="text"
					name="phone"
					id="phone"
					placeholder="012xxxxxxxx"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="address"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your Address
				</label>
				<input
					type="text"
					name="address"
					id="address"
					placeholder="40 Nady Street"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Your password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
				/>
			</div>

			<GradeGroupSelect />
			<button
				onClick={proceedAndClose}
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Add Student
			</button>
		</form>
	);
}

export default AddStudent;
