import StudentsGroupList from "components/StudentsGroupList";
import UsersList from "components/UsersList";
import { GROUPS_IDS_QUERY, GROUP_NAME_QUERY } from "core/queries/groupQueries";
import { GROUP_STUDENTS } from "core/queries/studentQueries";
import { createAxiosService } from "core/utils";
import usePagination from "customHooks.tsx/usePagination";
import Head from "next/head";

function groupItemData({ students, _count, groupName, nextCursor, groupId }) {
	const { PaginatedTable, refetch } = usePagination({
		list: students,
		nextCursor,
		_count,
		queryVariables: { groupId },
		hiddenColumns: ["id"],
		queryString: GROUP_STUDENTS,
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
	const { groupId } = params;
	const {
		data: {
			data: {
				Students: {
					list,
					nextCursor,
					groupName,
					totalCount: { _count },
				},
			},
		},
	} = await createAxiosService(GROUP_STUDENTS, {
		data: {
			isActive: null,
			role: "Student",
			groupId,
			PaginationInputType: {
				myCursor: null,
				orderByKey: "name",
				orderDirection: "asc",
				take: 5,
				skip: null,
			},
		},
	});

	let props = {};
	if (list && list.length > 0) {
		props = { ...props, students: list, _count, groupName, nextCursor, groupId };
	}

	// Pass post data to the page via props
	return { props };
}

export default groupItemData;
