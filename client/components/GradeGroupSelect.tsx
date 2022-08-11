import { createAxiosService } from "core/utils";
import { ACTIVE_GRADES_QUERY, GRADE_GROUPS_QUERY } from "features/gradeFeature/gradeQueries";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function GradeGroupSelect({ setGroupId, setGradeId, gradeId, groupId }) {
	const [groups, setGroups] = useState([]);
	const [selectedGrade, setSelectedGrade] = useState("");
	const [selectedGroup, setSelectedGroup] = useState("");

	useEffect(() => {
		setSelectedGrade(gradeId);
		refetch;
	}, [gradeId]);

	useEffect(() => {
		setGroupId(selectedGroup);
	}, [selectedGroup]);

	useEffect(() => {
		setGradeId(selectedGrade);
	}, [selectedGrade, gradeId]);

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
			enabled: selectedGrade?.length > 0 && selectedGroup?.length < 1,
			onSuccess: (data) => {
				setGroups(data?.Grade?.groups);
				setSelectedGroup(groupId);
			},
			onError: () => {
				setGroups([]);
				setSelectedGroup("");
			},
		}
	);

	const handleGradeSelection = async (gradeId: string) => {
		setSelectedGrade(gradeId);
		setGroups([]);
		setSelectedGroup("");
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
							if (value && value.length > 0) {
								handleGradeSelection(value);
							}
						}}
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option defaultChecked>Choose a Grade</option>
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
				onChange={(e) => {
					setSelectedGroup(e.target.value);
				}}
				required
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option defaultChecked>Choose a Group</option>
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
