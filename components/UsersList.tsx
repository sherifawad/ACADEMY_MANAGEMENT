import UsersListItem from "./UsersListItem";

function UsersList() {
	return (
		<div className="grid grid-row-[auto_1fr] gap-8">
			<button className="self-end shadow-sm px-8 py-1 rounded-full bg-green-300 text-white">
				Add Student
			</button>
			<UsersListItem
				avatar="johnAvatar.png"
				name="sherif Awad"
				email="sherif@sherif.com"
				status="true"
				grade="1st Grade"
				group="SMW"
			/>
		</div>
	);
}

export default UsersList;
