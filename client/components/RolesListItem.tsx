import { Role } from "features/rolesFeature/roleTypes";
import MiniCard from "./layout/MiniCard";

export interface RoleItemProps extends Role {
	key?: any;
	setRoleItemData: Function;
}
function RolesListItem({ id, name, description, setRoleItemData }: RoleItemProps) {
	const EditItem = () => {
		setRoleItemData({ id, description, name });
	};
	return <MiniCard name={name} cardDetailLink={`/roles/${id}`} EditItem={EditItem} />;
}

export default RolesListItem;
