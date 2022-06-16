import { useMutation } from "@apollo/client";
import { ADD_GROUP_MUTATION } from "graphql/mutations/groupMutations";
import { useSession } from "next-auth/react";
import { useState } from "react";

function AddGroup({ onProceed, onClose }) {
	const { data: session, status } = useSession();
	const [formState, setFormState] = useState({
		name: "",
		startAt: "",
		endAt: "",
	});

	const [addGroup, { data, error, loading }] = useMutation(ADD_GROUP_MUTATION, {
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
			await addGroup({
				variables: { name: formState.name, startAt: formState.startAt, endAt: formState.endAt },
			});
		} catch (error) {
			console.error("🚀 ~ file: AddGroup.tsx ~ line 26 ~ submitContact ~ error", error);
		}
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed();
		onClose();
	};

	return (
		<form method="dialog" className="space-y-6" action="#">
			<div>
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Group Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					value={formState.name}
					onChange={(e) =>
						setFormState({
							...formState,
							name: e.target.value,
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="1st Group"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="start"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Start At
				</label>
				<input
					type="time"
					name="start"
					id="start"
					value={formState.startAt}
					onChange={(e) =>
						setFormState({
							...formState,
							startAt: e.target.value?.toString(),
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="end"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					End At
				</label>
				<input
					type="time"
					name="end"
					id="end"
					value={formState.endAt}
					onChange={(e) =>
						setFormState({
							...formState,
							endAt: e.target.value?.toString(),
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
				/>
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

export default AddGroup;
