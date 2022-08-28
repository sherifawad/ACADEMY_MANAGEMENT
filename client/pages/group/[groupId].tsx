import { checkSession, ObjectFlatten } from "core/utils";
import useModel from "customHooks/useModel";
import usePagination from "customHooks/usePagination";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useToggle from "customHooks/useToggle";
import { useCheckboxes, useInputHooks } from "customHooks/reactTableHooks";
import { useRowSelect } from "react-table";
import { getGroupsIds, getGroupStudents, GROUPS_IDS_QUERY } from "features/groupFeature/groupQueries";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Paths from "core/paths";

function groupItemData({ list, _count, name, nextCursor, prevCursor, groupId, accessToken }) {
	const AddExam = dynamic(() => import("features/examFeature/AddExam"), {
		ssr: false,
	});
	const AddAttendance = dynamic(() => import("features/attendanceFeature/AddAttendance"), {
		ssr: false,
	});
	const checkBoxHook = (hooks: any) => useCheckboxes(hooks);
	const inputHook = (hooks: any) => useInputHooks(hooks, "examScore", "ExamScore");

	const [tableHooks, setTableHooks] = useState([checkBoxHook, useRowSelect, inputHook]);
	const [additionalHiddenColumns, setAdditionalHiddenColumns] = useState([]);
	const [flatRows, setFlatRows] = useState([]);
	const [showMainModel, setShowMainModel] = useState(true);
	const [showAttendancesModel, setShowAttendancesModel] = useState(false);
	const [showExamsModel, setShowExamsModel] = useState(false);
	const [value, toggleValue] = useToggle(true);

	const router = useRouter();
	const rowEditHandler = (row) => {
		router.push(`/student/${row.values?.id}`);
	};

	const toggledButtonClick = () => {
		toggleValue(!value);
		if (value) {
			setAdditionalHiddenColumns(["examScore"]);
		} else {
			setAdditionalHiddenColumns([]);
		}
	};

	const { PaginatedTable, refetch, checkedItems, inputsData } = usePagination({
		list,
		prevCursor,
		nextCursor,
		hasCheckBox: true,
		sortList: [{ user: { id: "asc" } }],
		_count,
		edit: rowEditHandler,
		queryVariables: { groupId },
		hiddenColumns: ["id", "avatar"],
		query: getGroupStudents,
		tableHooks,
		additionalHiddenColumns,
		accessToken,
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
				<title>{name || "Group"}</title>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	try {
		const { accessToken } = (await checkSession(req, res, authOptions)) as Session;

		const { groupId } = params;

		const variables = {
			groupId,
			role: "Student",
			data: {
				myCursor: null,
				orderByKey: null,
				orderDirection: "asc",
				take: 5,
				skip: null,
				sort: [{ user: { name: "asc" } }],
			},
		};
		const { name, list, nextCursor, prevCursor, totalCount } =
			(await getGroupStudents(variables, accessToken)) || {};
		const { _count } = totalCount || {};
		let flattenedList = [];
		if (list?.length > 0) {
			flattenedList = list.reduce((acc, curr) => [...acc, ObjectFlatten(curr)], []);
		}
		return {
			props: {
				accessToken,
				list: flattenedList,
				_count: _count ?? 0,
				name,
				prevCursor,
				nextCursor,
				groupId,
			},
		};
	} catch (error) {
		return {
			props: {
				session: null,
			},
		};
	}
};

export default groupItemData;
