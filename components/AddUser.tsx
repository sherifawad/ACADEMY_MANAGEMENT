import { Contact, family, Profile, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { createUserMutation, updateUserMutation } from "features/userFeature/userMutations";
import { usersByFamilyNameListQuery, usersByPhonesListQuery } from "features/userFeature/usersQueries";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
	convertFromListToString,
	getDividesNumbersFromString,
	getOptionsListAsString,
} from "utils/objectsUtils";
import CreatableSelection, { CreatableSelectionOption, createOption } from "./common/CreatableSelection";
import GradeGroupSelect from "./GradeGroupSelect";
import InputWithLabel from "./ui/InputWithLabel";

interface props {
	onProceed: Function;
	onClose: Function;
	initialUser: User;
	gradeId?: string;
	roleId?: number;
	isStudent?: boolean;
	profile: Profile;
	contact: Contact;
	family: family;
	groupId: string;
}

function AddUser({ onProceed, onClose, initialUser, gradeId, groupId, contact, family }: props) {
	const accessToken = null;
	const { isActive, image, name, id, password, email, roleId } = initialUser || {};
	const { phone, parentsPhones, address } = contact || {};

	const mainRef = useRef();
	const [hide, setHide] = useState<boolean>(false);
	const [_family, setFamily] = useState<{ label: string; value: string }>();
	const [_familyIds, setFamilyIds] = useState<{ label: string; value: string }[]>([]);
	const [_parentPhones, setParentPhones] = useState<CreatableSelectionOption[]>([]);
	const [_phones, setPhones] = useState<CreatableSelectionOption[]>([]);
	const [_roleId, setRoleId] = useState<number>(initialUser?.roleId || 1000);
	const [_groupId, setGroupId] = useState(groupId);
	const [_gradeId, setGradeId] = useState(gradeId);
	const [formState, setFormState] = useState({
		id: undefined,
		image: null,
		email: null,
		password: null,
		name: null,
		address: null,
		familyId: null,
		familyName: null,
	} as any);
	useEffect(() => {
		if (initialUser?.roleId) setRoleId(initialUser?.roleId);
	}, [initialUser?.roleId]);
	useEffect(() => {
		setGradeId(groupId);
	}, [groupId]);

	useEffect(() => {
		setFormState({
			...formState,
			name: name ?? null,
			email: email ?? null,
			address: address ?? null,
			image: image ?? null,
		});
	}, [email, address, name, groupId, isActive, image]);

	useEffect(() => {
		if (typeof parentsPhones !== "string" || parentsPhones.length < 1) return;
		const list = getDividesNumbersFromString(parentsPhones);
		const result = list?.map((item) => {
			return createOption(item);
		});
		if (!result?.length || result.length < 1) return;
		setParentPhones(result);
	}, [parentsPhones]);

	useEffect(() => {
		if (typeof phone !== "string" || phone.length < 1) return;
		const list = getDividesNumbersFromString(phone);
		const result = list?.map((item) => {
			return createOption(item);
		});
		if (!result?.length || result.length < 1) return;
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
			image: null,
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
			image: null,
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

	const onMultiChange = useCallback((newValue: { label: string; value: string }[], _actionMeta: any) => {
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
			<InputWithLabel label="role">
				<RoleSelection roleId={roleId} setRoleId={setRoleId} />
			</InputWithLabel>
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
			<InputWithLabel
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
			<InputWithLabel
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
			<InputWithLabel label="Phones">{phonesComponent}</InputWithLabel>
			{roleSelect}

			{_roleId === 4 ? (
				<InputWithLabel label="familyName">
					<AsyncCreatableSelect
						isClearable
						cacheOptions
						defaultOptions
						loadOptions={loadOptions}
						value={_family}
						onChange={onFamilyChange}
					/>
				</InputWithLabel>
			) : null}
			{_roleId === 5 ? (
				<InputWithLabel label="parentsPhones">{parentPhonesComponent}</InputWithLabel>
			) : null}

			<InputWithLabel
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
			<InputWithLabel
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
