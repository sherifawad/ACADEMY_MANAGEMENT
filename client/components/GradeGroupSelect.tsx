import { ACTIVE_GRADES_QUERY, GRADE_GROUPS_QUERY } from "core/queries/gradeQueries";
import { createAxiosService } from "core/utils";
import { useState } from "react";
import { useQuery } from "react-query";

function GradeGroupSelect() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [groups, setGroups] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState("");
	const [selectedGrade, setSelectedGrade] = useState("");

	const { data } = useQuery("ActiveGrades", () =>
		createAxiosService(ACTIVE_GRADES_QUERY).then((response) => response.data.data)
	);

	const { refetch } = useQuery(
		["getGroups", selectedGrade],
		() =>
			createAxiosService(GRADE_GROUPS_QUERY, { gradeId: selectedGrade }).then(
				(response) => response.data.data
			),
		{
			enabled: false,
		}
	);

	const handleGradeSelection = async (id: string) => {
		const result = await refetch();
		setGroups(result.data.Grade.groups);
	};

	return (
		<div className="flex">
			<div className="flex justify-center">
				<div>
					<label htmlFor="grades" className="sr-only">
						Choose a Grade
					</label>
					<select
						id="grades"
						value={selectedGrade}
						onChange={({ target: { value } }) => {
							setSelectedGrade(value);

							handleGradeSelection(value);
						}}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option disabled>Choose a Grade</option>
						{data &&
							data?.ActiveGrades?.map((grade) => (
								<option key={grade.id} value={grade.id}>
									{grade.name}
								</option>
							))}
					</select>
				</div>
			</div>
			<label htmlFor="groups" className="sr-only">
				Choose a Group
			</label>
			<select
				id="groups"
				value={selectedGroup}
				onChange={(e) => setSelectedGroup(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option disabled>Choose a Group</option>
				{groups &&
					groups?.map((group) => (
						<option key={group.id} value={group.id}>
							{group.name}
						</option>
					))}
			</select>
		</div>
	);
}

export default GradeGroupSelect;
