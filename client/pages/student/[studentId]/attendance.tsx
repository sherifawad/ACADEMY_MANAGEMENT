import { GET_PAGINATED_STUDENT_ATTENDANCES } from "core/queries/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

function Attendance({ PaginatedAttendances, profileId }) {
	const [attendances, setAttendances] = useState([]);

	useEffect(() => {
		var result = PaginatedAttendances.pageEdges.reduce(function (acc, pageEdge) {
			return acc.concat({ ...pageEdge.node });
		}, []);
		console.log("🚀 ~ file: attendance.tsx ~ line 15 ~ result ~ result", result);
		setAttendances(result);
	}, [PaginatedAttendances]);

	const attendancesColumns = useMemo(
		() =>
			attendances[0]
				? Object.keys(attendances[0])
						.filter((key) => key !== "id")
						.map((key) => {
							if (key === "startAt" || key === "endAt") {
								return {
									Header: key,
									accessor: key,
									Cell: ({ value }) =>
										value === null ? "-" : format(new Date(value), "hh:mm a"),
								};
							}
							return { Header: key, accessor: key };
						})
				: [],
		[PaginatedAttendances]
	);

	const tableInstance = useTable({
		columns: attendancesColumns,
		data: attendances,
		initialState: { hiddenColumns: ["note"] },
	});

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows, // Instead of using 'rows', we'll use page,
	} = tableInstance;

	return (
		<div className="container grid">
			<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg pt-4">
				<div className="w-full overflow-x-auto">
					<table {...getTableProps()} className="w-full">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
							{headerGroups.map((headerGroup) => (
								<tr
									{...headerGroup.getHeaderGroupProps()}
									className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
								>
									{headerGroup.headers.map((column) => (
										<th {...column.getHeaderProps()} className="px-4 py-3">
											{column.render("Header")}
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody {...getTableBodyProps()} className="bg-white">
							{rows.map((row) => {
								prepareRow(row);

								return (
									<tr {...row.getRowProps()} className="text-gray-700">
										{row.cells.map((cell) => {
											return (
												<td {...cell.getCellProps()} className="px-4 py-3 border">
													{cell.render("Cell")}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const result = await createAxiosService(GET_USERS_IDS, {
		data: {
			role: "Student",
		},
	});

	if (result?.data?.data) {
		const paths = result.data?.data?.FilteredUsers?.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, {
		studentId: params.studentId,
		cursor: null,
		orderBy: "startAt",
		orderDirection: "desc",
		size: 10,
		buttonNum: 4,
	});

	if (result?.data?.data) {
		return {
			props: {
				PaginatedAttendances: result?.data?.data.PaginatedAttendances,
				profileId: params.studentId,
			},
		};
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default Attendance;
