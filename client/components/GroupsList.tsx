import GroupsListItem from "./GroupsListItem";

function GroupsList({ groupsItems = [] }) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{groupsItems.map((x, i) => (
				<GroupsListItem key={i} name={x.name} active={x.isActive} />
			))}
		</div>
	);
}

export default GroupsList;
