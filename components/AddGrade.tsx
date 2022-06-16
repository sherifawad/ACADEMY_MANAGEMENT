import { useMutation } from "@apollo/client";
import { ADD_GRADE_MUTATION } from "graphql/mutations/gradeMutations";
import { useSession } from "next-auth/react";
import { useState } from "react";

function AddGrade({ onProceed, onClose }) {
	const { data: session, status } = useSession();
	const [name, setName] = useState("");

	const [addGrade, { data, error, loading }] = useMutation(ADD_GRADE_MUTATION, {
		context: {
			headers: {
				authorization: session?.accessToken ? `Bearer ${session.accessToken as string}` : "",
			},
		},
	});
	const submitContact = async (e) => {
		try {
			if (loading) return;
			e.preventDefault();
			await addGrade({ variables: { name: name } });
		} catch (error) {
			console.error("🚀 ~ file: AddGrade.tsx ~ line 26 ~ submitContact ~ error", error);
		}
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed();
		onClose();
	};

	return (
		<form method="dialog" className="space-y-6" action="#">
			<div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-4">
				<div className="row-span-full">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Grade Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="1st Grade"
						required
					/>
				</div>
				{/* <div className="flex items-center row-start-2 pt-[11px]">
					<div className="flex items-center h-5">
						<input
							id="active"
							type="checkbox"
							checked={active}
							onChange={() => {
								setActive(!active);
							}}
							className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
							required
						/>
					</div>
					<label
						htmlFor="active"
						className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						active
					</label>
				</div> */}
			</div>
			<button
				onClick={proceedAndClose}
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Add
			</button>
		</form>
	);
}

export default AddGrade;
