import { useMutation, useQuery } from "@tanstack/react-query";
import CreatableSelection from "components/common/CreatableSelection";
import MultiSelect from "components/common/MultiSelection";
import SingleSelection from "components/common/SingleSelection";
import GradeGroupSelect from "components/GradeGroupSelect";
import LabelInput from "components/inputs/LabelInput";
import { createAxiosService } from "core/utils";
import useAuth from "customHooks/useAuth";
import RoleSelection from "features/rolesFeature/RoleSelection";
import { rolesListQuery } from "features/rolesFeature/rolesQueries";
import dynamic from "next/dynamic";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MultiValue } from "react-select";
import async from "react-select/dist/declarations/src/async";
import { createUserMutation, CREATE_USER_MUTATION, updateUserMutation } from "./userMutations";
import { usersByPhonesListQuery } from "./usersQueries";
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

	const [_familyIds, setFamilyIds] = useState<{ label: string; value: string }[]>([]);
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

	const { isLoading, data: { FilteredUsersByPhoneQuery } = {} } = useQuery(
		["phones", formState.phone],
		async () => await usersByPhonesListQuery({ parentPhones: formState.phone }),
		{ enabled: formState.phone?.length === 11 && _roleId === 4 }
	);

	const onMultiChange = useCallback((newValue: { label: string; value: string }[], _actionMeta) => {
		console.log("🚀 ~ file: AddUser.tsx ~ line 89 ~ onMultiChange ~ newValue", newValue);
		setFamilyIds(newValue);
	}, []);

	const submitContact = async () => {
		if (createMutation.isLoading) return;
		if (updateMutation.isLoading) return;
		id ? await updateMutation.mutateAsync() : await createMutation.mutateAsync();
	};

	const proceedAndClose = async (e: MouseEvent<HTMLButtonElement>) => {
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

	const familySelect = useMemo(
		() => (
			<MultiSelect
				label="SelectFamily"
				list={FilteredUsersByPhoneQuery}
				selectedValues={_familyIds}
				onChange={onMultiChange}
			/>
		),
		[FilteredUsersByPhoneQuery, _familyIds]
	);

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
			<CreatableSelection />
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
			{formState.phone?.length === 11 && _roleId === 4 ? familySelect : null}
			{/* {formState.error?.length > 0 && <p className="text-red-600">{formState.error}</p>} */}
			<button
				type="button"
				onClick={proceedAndClose}
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddUser;
