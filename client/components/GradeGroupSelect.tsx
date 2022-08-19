import { createAxiosService } from "core/utils";
import useAuth from "customHooks/useAuth";
import {
	ACTIVE_GRADES_QUERY,
	getActiveGradesList,
	getGradeGroups,
	GRADE_GROUPS_QUERY,
} from "features/gradeFeature/gradeQueries";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";

function GradeGroupSelect({ setGroupId, setGradeId, gradeId, groupId }) {
	const { accessToken } = useAuth();
	const [groups, setGroups] = useState([]);
	const [selectedGrade, setSelectedGrade] = useState("");
	const [selectedGroup, setSelectedGroup] = useState("");
	const [activeGrades, setActiveGrades] = useState([]);

	useEffect(() => {
		setSelectedGrade(gradeId);
		fetchGroups();
	}, [gradeId]);

	useEffect(() => {
		setGroupId(selectedGroup);
	}, [selectedGroup]);

	useEffect(() => {
		setGradeId(selectedGrade);
		fetchGroups();
	}, [selectedGrade, gradeId]);

	const fetchGrades = useCallback(async () => {
		const { grades } = await getActiveGradesList(accessToken);

		setActiveGrades(grades);
	}, []);

	const fetchGroups = useCallback(async () => {
		if (!selectedGrade) return;
		const { groups = [] } = await getGradeGroups({ gradeId: selectedGrade }, accessToken);
		if (groups && groups.length > 0) {
			setGroups(groups);
			setSelectedGroup(groupId);
		}
	}, [selectedGrade, gradeId, groupId]);

	useEffect(() => {
		fetchGrades();
	}, []);

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
						{activeGrades?.map((grade) => (
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
