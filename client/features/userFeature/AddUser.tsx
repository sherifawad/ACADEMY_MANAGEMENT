import { useMutation, useQuery } from "@tanstack/react-query";
import CreatableSelection, {
	CreatableSelectionOption,
	createOption,
} from "components/common/CreatableSelection";
import MultiSelect from "components/common/MultiSelection";
import GradeGroupSelect from "components/GradeGroupSelect";
import LabelInput from "components/inputs/LabelInput";
import LabelWithChildren from "components/inputs/LabelWithChildren";
import AsyncCreatableSelect from "react-select/async-creatable";
import { convertFromListToString, getDividesNumbersFromString, getOptionsListAsString } from "core/utils";
import useAuth from "customHooks/useAuth";
import RoleSelection from "features/rolesFeature/RoleSelection";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createUserMutation, updateUserMutation } from "./userMutations";
import { usersByFamilyNameListQuery, usersByPhonesListQuery } from "./usersQueries";
import { userInitialProperties } from "./userTypes";
import FamilyCustomInput from "components/common/FamilyCustomInput";

function AddUser({ onProceed, onClose, initialUser, roleId, gradeId }: userInitialProperties) {
	console.log("🚀 ~ file: AddUser.tsx ~ line 15 ~ AddUser");
	const { accessToken } = useAuth();

	const { profile, isActive, contact, avatar, name, id, password, groupId, family } = initialUser || {};
	const { email, phone, parentsPhones, address } = contact || {};

	const mainRef = useRef();
	const [hide, setHide] = useState<boolean>(false);
	const [_family, setFamily] = useState<{ label: string; value: string }>();
	const [_familyIds, setFamilyIds] = useState<{ label: string; value: string }[]>([]);
	const [_parentPhones, setParentPhones] = useState<CreatableSelectionOption[]>([]);
	const [_phones, setPhones] = useState<CreatableSelectionOption[]>([]);
	const [_roleId, setRoleId] = useState<number>(roleId);
	const [_groupId, setGroupId] = useState(groupId);
	const [_gradeId, setGradeId] = useState(gradeId);
	const [formState, setFormState] = useState({
		id: undefined,
		avatar: null,
		email: null,
		password: null,
		name: null,
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
			address: address ?? null,
			avatar: avatar ?? null,
		});
	}, [email, address, name, groupId, isActive, avatar]);

	useEffect(() => {
		if (typeof parentsPhones !== "string" || parentsPhones.length < 1) return;
		const list = getDividesNumbersFromString(parentsPhones);
		const result = list?.map((item) => {
			return createOption(item);
		});
		if (result?.length < 1) return;
		setParentPhones(result);
	}, [parentsPhones]);

	useEffect(() => {
		if (typeof phone !== "string" || phone.length < 1) return;
		const list = getDividesNumbersFromString(phone);
		const result = list?.map((item) => {
			return createOption(item);
		});
		if (result?.length < 1) return;
		setPhones(result);
	}, [phone]);

	useEffect(() => {
		if (!family) return;
		setFamily({ label: family.familyName, value: family.id });
	}, [family]);

	//TODO: stop calling every render
	const createMutation = createUserMutation(
		{
			...formState,
			groupId: _groupId,
			roleId: _roleId,
			avatar: null,
			phone: convertFromListToString(_phones),
			parentsPhones: convertFromListToString(_parentPhones),
			familyListIds: getOptionsListAsString(_familyIds),
			familyId: _family?.value ?? null,
		},
		accessToken
	);

	const updateMutation = updateUserMutation(
		{
			...formState,
			userUpdateId: id,
			groupId: _groupId,
			roleId: _roleId,
			avatar: null,
			phone: convertFromListToString(_phones),
			parentsPhones: convertFromListToString(_parentPhones),
			familyListIds: getOptionsListAsString(_familyIds),
			familyId: _family?.value ?? null,
		},
		accessToken
	);

	const { isLoading, data: { FilteredUsersByPhoneQuery } = {} } = useQuery(
		["phones", _phones, _parentPhones],
		async () => {
			switch (_roleId) {
				case 4:
					return await usersByPhonesListQuery({
						phones: getOptionsListAsString(_phones),
						roleId: 4,
					});
				case 5:
					return await usersByPhonesListQuery({
						phones: getOptionsListAsString(_parentPhones),
						roleId: 5,
					});

				default:
					return { FilteredUsersByPhoneQuery: [] };
			}
		},
		{
			enabled: (_phones?.length > 0 && _roleId === 4) || (_parentPhones?.length > 0 && _roleId === 5),
		}
	);

	const onMultiChange = useCallback((newValue: { label: string; value: string }[], _actionMeta) => {
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

	const roleSelect = useMemo(
		() => (
			<LabelWithChildren label="role">
				<RoleSelection roleId={roleId} setRoleId={setRoleId} />
			</LabelWithChildren>
		),
		[roleId]
	);

	const familyCustom = useMemo(
		() => (
			<FamilyCustomInput
				onClick={() => {
					setHide(true);
				}}
				defaultValue={_family?.label}
			/>
		),
		[_family]
	);

	const parentPhonesComponent = useMemo(
		() => (
			<CreatableSelection
				value={_parentPhones}
				onChange={(newValue) => setParentPhones(newValue)}
				setValue={setParentPhones}
			/>
		),
		[_parentPhones]
	);

	const phonesComponent = useMemo(
		() => (
			<CreatableSelection
				value={_phones}
				onChange={(newValue) => setPhones(newValue)}
				setValue={setPhones}
			/>
		),
		[_phones]
	);

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

	const loadOptions = async (inputValue: string) => {
		if (inputValue.length < 3) return;
		const { list } = await usersByFamilyNameListQuery({ roleId: 4, familyName: inputValue }, accessToken);

		if (!list || list.length < 1) return;

		return (list as { family: { familyName: string; id: string } }[]).map((item) => {
			return { label: item.family.familyName, value: item.family.id };
		});
	};

	const onFamilyChange = (newValue: CreatableSelectionOption) => {
		setFamily(newValue);
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
						email: e.target.value,
					})
				}
			/>
			<LabelInput
				name={"name"}
				label={"Full name"}
				placeholder={"Ahmed Mohammed"}
				value={formState?.name}
				onChange={(e) =>
					setFormState({
						...formState,
						name: e.target.value,
					})
				}
			/>
			<LabelWithChildren label="Phones">{phonesComponent}</LabelWithChildren>
			{roleSelect}

			{_roleId === 4 ? (
				<LabelWithChildren label="familyName">
					<AsyncCreatableSelect
						isClearable
						cacheOptions
						defaultOptions
						loadOptions={loadOptions}
						value={_family}
						onChange={onFamilyChange}
					/>
				</LabelWithChildren>
			) : null}
			{_roleId === 5 ? (
				<LabelWithChildren label="parentsPhones">{parentPhonesComponent}</LabelWithChildren>
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
			{id && !hide
				? familyCustom
				: (_phones?.length > 0 && _roleId === 4) || (_parentPhones?.length > 0 && _roleId === 5)
				? familySelect
				: null}
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
