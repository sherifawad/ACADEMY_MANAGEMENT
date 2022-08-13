import LabelInput from "components/inputs/LabelInput";
import { useEffect, useRef, useState } from "react";
import GradeGroupSelect from "../../components/GradeGroupSelect";
import { createUserMutation } from "./userMutations";
import { userInitialProperties } from "./userTypes";

function AddUser({ onProceed, onClose, initialUser, gradeId, isStudent = true }: userInitialProperties) {
	const { profile, isActive, contact, avatar, name, id, password, groupId } = initialUser || {};
	const { email, phone, parentsPhones, address } = contact || {};

	const mainRef = useRef();

	const [_groupId, setGroupId] = useState();
	const [_gradeId, setGradeId] = useState();
	const [role, setRole] = useState("Student");
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

	const createMutation = createUserMutation({ ...formState, groupId });

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
			{isStudent && (
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
			)}
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

			{isStudent && (
				<GradeGroupSelect
					setGroupId={setGroupId}
					setGradeId={setGradeId}
					groupId={groupId}
					gradeId={gradeId}
				/>
			)}

			{!isStudent && (
				<div>
					<label htmlFor="role" className="sr-only">
						Choose a Role
					</label>

					<select
						id="role"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={role}
						onChange={({ target: { value } }) => {
							if (value && typeof value === "string" && value.length > 0) {
								setRole(value);
							}
						}}
					>
						{["Student", "ADMIN", "USER"].map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</select>
				</div>
			)}
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

export default AddUser;
