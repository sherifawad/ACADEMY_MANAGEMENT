import StudentsGroupList from "components/StudentsGroupList";
import UsersList from "components/UsersList";
import { GROUPS_IDS_QUERY, GROUP_NAME_QUERY } from "core/queries/groupQueries";
import { GROUP_STUDENTS } from "core/queries/studentQueries";
import { createAxiosService } from "core/utils";
import usePagination from "customHooks.tsx/usePagination";
import Head from "next/head";
import { useRouter } from "next/router";

const initialData = async (variable: {}) => {
	const {
		data: {
			data: {
				studentsGroup: {
					students: { list, nextCursor, totalCount },
					groupName,
				},
			},
		},
	} = await createAxiosService(GROUP_STUDENTS, variable);
	let result = {};
	if (totalCount) {
		const { _count } = totalCount;
		return { list, nextCursor, _count, groupName };
	} else {
		return { list, nextCursor, groupName };
	}
};

function groupItemData({ list, _count, groupName, nextCursor, groupId }) {
	const router = useRouter();
	const rowEditHandler = (row) => {
		router.push(`/student/${row.values?.id}`);
	};
	const { PaginatedTable, refetch } = usePagination({
		list,
		nextCursor,
		_count,
		edit: rowEditHandler,
		queryVariables: { groupId },
		hiddenColumns: ["id"],
		query: initialData,
	});
	return (
		<div className="container">
			<Head>
				<title>{groupName || "Group"}</title>
				<meta name="description" content="Group students" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<PaginatedTable />
			<div className="grid grid-row-[auto_1fr] gap-8">
				{/* <UsersList users={students} /> */}
				{/* <StudentsGroupList students={students} /> */}
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
		const { groupName, list, nextCursor, _count } = await initialData(variables);
		return {
			props: {
				list,
				_count,
				groupName,
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
