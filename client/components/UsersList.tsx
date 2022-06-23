import UsersListItem from "./UsersListItem";

function UsersList({ users = [] }) {
	return (
		<div>
			{users.map((x) => (
				<UsersListItem
					key={x.id}
					id={x.id}
					name={x.name}
					avatar={x.avatar}
					email={x.contact.email}
					status={x.isActive}
					grade={x.profile?.group?.grade?.name}
					group={x.profile?.group?.name}
				/>
			))}
		</div>
	);
}

export default UsersList;
