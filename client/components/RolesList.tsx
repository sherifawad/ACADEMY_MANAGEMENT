import { Role } from "features/rolesFeature/roleTypes";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import AddGroup from "../features/groupFeature/AddGroup";
import AddModel from "./AddModel";
import GroupsListItem, { Group } from "./GroupsListItem";
import RolesListItem from "./RolesListItem";

export interface RolesList {
	setRolesItemData: Function;
	rolesItems: Role[];
}
function RolesList({ rolesItems = [], setRolesItemData }: RolesList) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
			{rolesItems.map((x, i) => (
				<RolesListItem key={x.id} {...x} setRoleItemData={setRolesItemData} />
			))}
		</div>
	);
}

export default RolesList;
