import { useRef, useState } from "react";
import AddModel from "./AddModel";
import AddStudentModel from "./AddModel";
import AddStudent from "./AddStudent";
import UsersListItem from "./UsersListItem";

function UsersList() {
	const [isOpened, setIsOpened] = useState(false);

	const onProceed = () => {
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		console.log("close clicked");
	};

	return (
		<div className="grid grid-row-[auto_1fr] gap-8">
			<AddModel isOpened={isOpened} onClose={onClose} title="Add Student">
				<AddStudent onProceed={onProceed} onClose={onClose} />
			</AddModel>
			<button
				onClick={() => setIsOpened(true)}
				className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
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
