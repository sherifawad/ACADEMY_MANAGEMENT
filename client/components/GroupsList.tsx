import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import AddGroup from "../features/groupFeature/AddGroup";
import AddModel from "./AddModel";
import GroupsListItem, { Group } from "./GroupsListItem";

export interface GroupsList {
	setGroupItemData: Function;
	groupsItems: Group[];
}
function GroupsList({ groupsItems = [], setGroupItemData }: GroupsList) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
			{groupsItems.map((x, i) => (
				<GroupsListItem key={x.id} {...x} setGroupItemData={setGroupItemData} />
			))}
		</div>
	);
}

export default GroupsList;
