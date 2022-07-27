import StudentsGroupList from "components/StudentsGroupList";
import UsersList from "components/UsersList";
import { GROUPS_IDS_QUERY, GROUP_NAME_QUERY } from "core/queries/groupQueries";
import { GROUP_STUDENTS } from "core/queries/studentQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks.tsx/useModel";
import usePagination from "customHooks.tsx/usePagination";
import AddAttendance from "features/attendanceFeature/AddAttendance";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

	const router = useRouter();
	const rowEditHandler = (row) => {
		router.push(`/student/${row.values?.id}`);
	};
	const { PaginatedTable, refetch, checkedItems } = usePagination({
		list,
		prevCursor,
		nextCursor,
		hasCheckBox: true,
		_count,
		inputColumn: { columId: "examScore", headerName: "ExamScore" },
		edit: rowEditHandler,
		queryVariables: { groupId },
		hiddenColumns: ["id", "avatar", "isActive"],
		query: initialData,
	});

	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel(true);
	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

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
			<Model title="Attendance">
				<AddAttendance
					onProceed={onProceed}
					onClose={modelProps.onClose}
					profileIds={checkedItems}
					edit={modelProps.editButtonClicked}
					initialAttendance={{
						profileId: "",
						id: itemData?.id,
						startAt: itemData?.startAt,
						endAt: itemData?.endAt,
						note: itemData?.note,
					}}
				/>
			</Model>
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
