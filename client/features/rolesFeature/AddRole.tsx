import LabelInput from "components/inputs/LabelInput";
import useAuth from "customHooks/useAuth";
import { useEffect, useState } from "react";
import { createRoleMutation, updateRoleMutation } from "./roleMutations";
import { Role, RoleInitials } from "./roleTypes";

function AddRole({ onProceed = () => {}, onClose, id, name, description }: RoleInitials) {
	const { accessToken } = useAuth();

	const [formState, setFormState] = useState({
		id,
		name,
		description,
		error: "",
	});

	useEffect(() => {
		setFormState({ ...formState, id, name, description });
	}, [id, name, description]);

	const createMutation = createRoleMutation(
		{
			name: formState.name,
			description: formState.description,
		},
		accessToken
	);

	const updateMutation = updateRoleMutation(
		{
			roleId: formState.id,
			name: formState.name,
			description: formState.description,
		},
		accessToken
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
		<form onSubmit={proceedAndClose} method="dialog" className="space-y-6" action="#">
			<LabelInput
				name={"name"}
				label={"roleName"}
				placeholder={"Admin"}
				value={formState?.name}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						name: e.target.value,
					})
				}
			/>
			<LabelInput
				name={"description"}
				label={"description"}
				placeholder={"description"}
				value={formState?.description}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						description: e.target.value,
					})
				}
			/>
			<button
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddRole;
