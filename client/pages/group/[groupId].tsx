import AddExam from "features/examFeature/AddExam";
import StudentsGroupList from "components/StudentsGroupList";
import UsersList from "components/UsersList";
import { GROUPS_IDS_QUERY, GROUP_NAME_QUERY } from "core/queries/groupQueries";
import { GROUP_STUDENTS } from "core/queries/studentQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks/useModel";
import usePagination from "customHooks/usePagination";
import AddAttendance from "features/attendanceFeature/AddAttendance";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useToggle from "customHooks/useToggle";

const initialData = async (variable: {}) => {
	const {
		data: {
			data: { studentsGroup },
		},
	} = await createAxiosService(GROUP_STUDENTS, variable);
	if (studentsGroup) {
		const {
			students: { list, nextCursor, prevCursor, totalCount },
			groupName,
		} = studentsGroup;
		if (totalCount) {
			const { _count } = totalCount;
			return { list, nextCursor, prevCursor, _count, groupName };
		} else {
			return { list, nextCursor, prevCursor, groupName };
		}
	} else {
		return {};
	}
};

function groupItemData({ list, _count, groupName, nextCursor, prevCursor, groupId }) {
	const [flatRows, setFlatRows] = useState([]);
	const [showMainModel, setShowMainModel] = useState(true);
	const [showAttendancesModel, setShowAttendancesModel] = useState(false);
	const [showExamsModel, setShowExamsModel] = useState(false);
	const [value, toggleValue] = useToggle(false);

	const router = useRouter();
	const rowEditHandler = (row) => {
		router.push(`/student/${row.values?.id}`);
	};
	const { PaginatedTable, refetch, checkedItems, inputsData } = usePagination({
		list,
		prevCursor,
		nextCursor,
		hasCheckBox: true,
		_count,
		inputColumn: value ? { columId: "examScore", headerName: "ExamScore" } : undefined,
		additionalHiddenColumns: value ? ["examScore"] : undefined,
		edit: rowEditHandler,
		queryVariables: { groupId },
		hiddenColumns: ["id", "avatar", "isActive"],
		query: initialData,
	});

	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel(false);

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const attendancesClicked = () => {
		setShowMainModel(false);
		setShowAttendancesModel(true);
		setShowExamsModel(false);
	};
	const examsClicked = () => {
		setShowMainModel(false);
		setShowAttendancesModel(false);
		setShowExamsModel(true);
	};

	const toggledButtonClick = () => {
		toggleValue(!value);
	};

	// reset values on model opened
	useEffect(() => {
		setShowMainModel(true);
		setShowAttendancesModel(false);
		setShowExamsModel(false);
	}, [Model]);

	useEffect(() => {
		setFlatRows([checkedItems]);
	}, [checkedItems]);

	return (
		<div className="container">
			<Head>
				<title>{groupName || "Group"}</title>
				<meta name="description" content="Group students" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Model title="Action">
				{showAttendancesModel && (
					<AddAttendance
						onProceed={onProceed}
						onClose={modelProps.onClose}
						profileIds={checkedItems}
						multiEnabled={true}
						initialAttendance={{
							profileId: "",
							id: itemData?.id,
							startAt: itemData?.startAt,
							endAt: itemData?.endAt,
							note: itemData?.note,
						}}
					/>
				)}
				{showExamsModel && (
					<AddExam
						onProceed={onProceed}
						onClose={modelProps.onClose}
						multiEnabled={true}
						profileIds={checkedItems}
						studentsAndScores={inputsData}
						{...itemData}
					/>
				)}
				{showMainModel && (
					<div className="flex items-center justify-center gap-4">
						<button
							className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={attendancesClicked}
						>
							Attendances
						</button>
						<button
							className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={examsClicked}
						>
							Exams
						</button>
					</div>
				)}
			</Model>

			<label
				htmlFor="ExamScore-toggle"
				className="inline-flex relative items-center mb-5 cursor-pointer"
			>
				<input
					type="checkbox"
					value=""
					id="ExamScore-toggle"
					className="sr-only peer"
					checked={value}
					onChange={toggledButtonClick}
				/>
				<div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">
					Set Exam Score
				</span>
			</label>

			<PaginatedTable />
			<div className="grid grid-row-[auto_1fr] gap-8">
				{/* <UsersList users={students} /> */}
				{/* <StudentsGroupList students={students} /> */}
				<pre>
					<code>
						{JSON.stringify(
							{
								"selectedFlatRows[].original": flatRows?.map((d) => d),
							},
							null,
							2
						)}
					</code>
				</pre>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const {
		data: {
			data: { Groups },
		},
	} = await createAxiosService(GROUPS_IDS_QUERY);

	if (Groups) {
		const paths = Groups?.map((group) => ({
			params: { groupId: group?.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	try {
		const { groupId } = params;
		const variables = {
			groupId,
			role: "Student",
			data: {
				myCursor: null,
				orderByKey: "id",
				orderDirection: "asc",
				take: 5,
				skip: null,
			},
		};
		const { groupName, list, nextCursor, prevCursor, _count } = await initialData(variables);
		return {
			props: {
				list,
				_count,
				groupName,
				prevCursor,
				nextCursor,
				groupId,
			},
		};
	} catch (error) {
		return {
			props: null,
		};
	}
}

export default groupItemData;
