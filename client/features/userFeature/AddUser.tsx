import { useMutation } from "@tanstack/react-query";
import SingleSelection from "components/common/SingleSelection";
import GradeGroupSelect from "components/GradeGroupSelect";
import LabelInput from "components/inputs/LabelInput";
import { createAxiosService } from "core/utils";
import useAuth from "customHooks/useAuth";
import RoleSelection from "features/rolesFeature/RoleSelection";
import { rolesListQuery } from "features/rolesFeature/rolesQueries";
import dynamic from "next/dynamic";
import { FormEvent, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createUserMutation, CREATE_USER_MUTATION, updateUserMutation } from "./userMutations";
import { userInitialProperties } from "./userTypes";

function AddUser({
	onProceed,
	onClose,
	initialUser,
	roleId,
	gradeId,
	isStudent = true,
}: userInitialProperties) {
	console.log("🚀 ~ file: AddUser.tsx ~ line 15 ~ AddUser");
	const { accessToken } = useAuth();

	const { profile, isActive, contact, avatar, name, id, password, groupId, family } = initialUser || {};
	const { email, phone, parentsPhones, address } = contact || {};

	const mainRef = useRef();

	const [_roleId, setRoleId] = useState<number>(roleId);
	const [_groupId, setGroupId] = useState(groupId);
	const [_gradeId, setGradeId] = useState(gradeId);
	const [formState, setFormState] = useState({
		id: undefined,
		avatar: null,
		email: null,
		password: null,
		name: null,
		phone: null,
		parentsPhones: null,
		address: null,
		familyId: null,
		familyName: null,
	});
	useEffect(() => {
		setRoleId(roleId);
	}, [roleId]);
	useEffect(() => {
		setGradeId(groupId);
	}, [groupId]);

	useEffect(() => {
		setFormState({
			...formState,
			name: name ?? null,
			email: email ?? null,
			phone: phone ?? null,
			parentsPhones: parentsPhones ?? null,
			address: address ?? null,
			avatar: avatar ?? null,
			familyId: family?.id ?? null,
			familyName: family?.familyName ?? null,
		});
	}, [email, phone, address, parentsPhones, name, groupId, isActive, avatar, family]);

	//TODO: stop calling every render
	const createMutation = createUserMutation(
		{ ...formState, groupId: _groupId, roleId: _roleId, avatar: null },
		accessToken
	);

	const updateMutation = updateUserMutation(
		{ ...formState, userUpdateId: id, groupId: _groupId, roleId: _roleId },
		accessToken
	);

	const submitContact = async () => {
		if (createMutation.isLoading) return;
		if (updateMutation.isLoading) return;
		id ? await updateMutation.mutateAsync() : await createMutation.mutateAsync();
	};

	const proceedAndClose = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await submitContact();
		onProceed();
		onClose();
	};

	const groupSelect = useMemo(
		() => (
			<GradeGroupSelect
				setGroupId={setGroupId}
				setGradeId={setGradeId}
				groupId={groupId}
				gradeId={gradeId}
			/>
		),
		[groupId, gradeId]
	);

	const roleSelect = useMemo(() => <RoleSelection roleId={roleId} setRoleId={setRoleId} />, [roleId]);

	return (
		<form onSubmit={proceedAndClose} method="dialog" className="space-y-6" action="#" ref={mainRef}>
			<LabelInput
				name={"email"}
				label={"Your email"}
				type={"email"}
				placeholder={"name@company.com"}
				value={formState?.email}
				onChange={(e) =>
					setFormState({
						...formState,
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
						name: e.target.value,
					})
				}
			/>
			{isStudent && (
				<LabelInput
					name={"familyName"}
					label={"Your Family Name"}
					placeholder={"Ibn Nas"}
					value={formState?.familyName}
					onChange={(e) =>
						setFormState({
							...formState,
							familyName: e.target.value,
						})
					}
				/>
			)}
			<LabelInput
				name={"phone"}
				label={"Your phone"}
				placeholder={"01xxxxxxxxxx"}
				value={formState?.phone}
				onChange={(e) =>
					setFormState({
						...formState,
						phone: e.target.value,
					})
				}
			/>
			{roleSelect}
			{_roleId === 5 ? (
				<LabelInput
					name={"parentPhone"}
					label={"Your parentPhone"}
					placeholder={"01xxxxxxxxxx"}
					value={formState?.parentsPhones}
					onChange={(e) =>
						setFormState({
							...formState,
							parentsPhones: e.target.value,
						})
					}
				/>
			) : null}

			<LabelInput
				name={"address"}
				label={"Your address"}
				placeholder={"5 main street, Tanta"}
				value={formState?.address}
				onChange={(e) =>
					setFormState({
						...formState,
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
						password: e.target.value,
					})
				}
			/>
			{_roleId === 5 ? groupSelect : null}
			{/* {formState.error?.length > 0 && <p className="text-red-600">{formState.error}</p>} */}
			<button
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddUser;
