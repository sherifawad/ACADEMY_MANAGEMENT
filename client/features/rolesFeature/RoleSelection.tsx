import SingleSelection from "components/common/SingleSelection";
import useAuth from "customHooks/useAuth";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { rolesListQuery } from "./rolesQueries";
import { Role } from "./roleTypes";

type Props = {
	roleId: number;
	setRoleId: Dispatch<SetStateAction<number>>;
};

const RoleSelection = ({ roleId, setRoleId }: Props) => {
	const { accessToken } = useAuth();
	const [selectedRole, setSelectedRole] = useState<Role>();
	const [rolesList, setRolesList] = useState<Role[]>([]);

	const getRoles = useMemo(
		() => async () => {
			try {
				const { roles, error } = await rolesListQuery(accessToken);
				if (error) {
					throw new Error(error);
				}
				if (roles) {
					setRolesList(roles);
				}
				return [];
			} catch (error) {
				return [];
			}
		},
		[]
	);

	const getRoleItem = useMemo(() => (id: number) => rolesList.find((x) => x.id === id), [rolesList]);

	useEffect(() => {
		getRoles();
	}, []);

	useEffect(() => {
		const role = getRoleItem(roleId);
		if (!role) return;
		setSelectedRole(role);
	}, [roleId]);

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const id = Number(e.target.value);
		if (isNaN(id)) return;
		const role = rolesList.find((x) => x.id === id);
		if (!role) return;
		setSelectedRole(role);
		setRoleId(id);
	};

	return (
		<SingleSelection
			optionsList={rolesList?.map((item) => (
				<option key={item.id} value={item.id}>
					{item.name}
				</option>
			))}
			title="roles"
			value={selectedRole?.id.toString()}
			onChange={onChange}
		/>
	);
};

export default RoleSelection;
