import UsersListItem from "./UsersListItem";

function UsersList({ users = [] }) {
	return (
		<div>
			{users.map((x, i) => (
				<UsersListItem
					key={i}
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
