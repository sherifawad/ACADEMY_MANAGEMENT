import { ADD_GRADE_MUTATION, UPDATE_GRADE_MUTATION } from "core/mutations/gradeMutations";
import { createAxiosService } from "core/utils";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Grade } from "./GradesListItem";

export interface GradeInitials extends Grade {
	onProceed: Function;
	onClose: Function;
}

function AddGrade({ onProceed, onClose, id, name, isActive }) {
	const [formState, setFormState] = useState({
		id,
		name,
		isActive,
	});

	useEffect(() => {
		setFormState({ id, name, isActive });
	}, [id, name, isActive]);
	const createMutation = useMutation(
		"AddGrade",
		() =>
			createAxiosService(ADD_GRADE_MUTATION, {
				name: formState.name,
				isActive: formState.isActive,
			}).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Grade Created Successfully");
			},
		}
	);
	const updateMutation = useMutation(
		"UpdateGrade",
		() =>
			createAxiosService(UPDATE_GRADE_MUTATION, {
				updateGradeId: formState.id,
				name: formState.name,
				isActive: formState.isActive,
			}).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Grade Updated Successfully");
			},
		}
	);

	const submitContact = async (e) => {
		e.preventDefault();
		if (createMutation.isLoading) return;
		if (updateMutation.isLoading) return;
		id ? await updateMutation.mutateAsync() : await createMutation.mutateAsync();
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
						value={formState.name}
						onChange={(e) => setFormState({ ...formState, name: e.target.value })}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="1st Grade"
						required
					/>
				</div>
				<div className="flex items-center row-start-2 pt-[11px]">
					<div className="flex items-center h-5">
						<input
							id="active"
							type="checkbox"
							checked={formState.isActive}
							onChange={() => {
								setFormState({ ...formState, isActive: !formState.isActive });
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
				</div>
			</div>
			<button
				onClick={proceedAndClose}
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddGrade;
