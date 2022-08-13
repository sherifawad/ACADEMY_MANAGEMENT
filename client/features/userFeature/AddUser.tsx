import LabelInput from "components/inputs/LabelInput";
import { createStudentMutation } from "features/studentFeature/studentMutations";
import { useEffect, useRef, useState } from "react";
import GradeGroupSelect from "../../components/GradeGroupSelect";
import { studentInitialProperties } from "./userTypes";

function AddStudent({ onProceed, onClose, initialStudent, gradeId }: studentInitialProperties) {
	const { profile, isActive, contact, avatar, name, id, password, groupId } = initialStudent || {};
	const { email, phone, parentsPhones, address } = contact || {};

	const mainRef = useRef();

	const [_groupId, setGroupId] = useState();
	const [_gradeId, setGradeId] = useState();
	const [formState, setFormState] = useState({
		id,
		isActive,
		avatar,
		email,
		password,
		name,
		phone,
		parentsPhones,
		address,
		error: "",
	});

	useEffect(() => {
		setFormState({
			...formState,
			name,
			email,
			phone,
			parentsPhones,
			address,
			isActive,
			avatar,
		});
	}, [email, phone, address, parentsPhones, name, groupId, isActive, avatar]);

	const createMutation = createStudentMutation({ ...formState, groupId });

	const submitContact = async (e) => {
		e.preventDefault();
		if (createMutation.isLoading) return;
		await createMutation.mutateAsync();
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed();
		onClose();
	};

	return (
		<form method="dialog" className="space-y-6" action="#" ref={mainRef}>
			<LabelInput
				name={"email"}
				label={"Your email"}
				type={"email"}
				placeholder={"name@company.com"}
				value={formState?.email}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						email: e.target.value,
					})
				}
			/>
			<LabelInput
				name={"name"}
				label={"Your name"}
				placeholder={"Ahmed Mohammed"}
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
				name={"phone"}
				label={"Your phone"}
				placeholder={"01xxxxxxxxxx"}
				value={formState?.phone}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						phone: e.target.value,
					})
				}
			/>
			<LabelInput
				name={"parentPhone"}
				label={"Your parentPhone"}
				placeholder={"01xxxxxxxxxx"}
				value={formState?.parentsPhones}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						parentsPhones: e.target.value,
					})
				}
			/>
			<LabelInput
				name={"address"}
				label={"Your address"}
				placeholder={"5 main street, Tanta"}
				value={formState?.address}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						address: e.target.value,
					})
				}
			/>
			<LabelInput
				name={"password"}
				label={"Your password"}
				placeholder={"********"}
				value={formState?.password}
				onChange={(e) =>
					setFormState({
						...formState,
						error: "",
						password: e.target.value,
					})
				}
			/>

			<GradeGroupSelect
				setGroupId={setGroupId}
				setGradeId={setGradeId}
				groupId={groupId}
				gradeId={gradeId}
			/>
			{formState.error?.length > 0 && <p className="text-red-600">{formState.error}</p>}

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

export default AddStudent;
