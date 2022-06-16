import { useRef, useState } from "react";
import AddModel from "./AddModel";
import AddStudentModel from "./AddModel";
import AddStudent from "./AddStudent";
import GradesListItem from "./GradesListItem";
import UsersListItem from "./UsersListItem";

function GradesList({ gradesItems = [] }) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{gradesItems.map((x, i) => (
				<GradesListItem key={i} name={x.name} active={x.isActive} />
			))}
		</div>
	);
}

export default GradesList;
