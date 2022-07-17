import { GET_PAGINATED_STUDENT_ATTENDANCES } from "core/queries/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

function Attendance({ PaginatedAttendances, profileId }) {
	// console.log(
	// 	"🚀 ~ file: attendance.tsx ~ line 9 ~ Attendance ~ PaginatedAttendances",
	// 	JSON.stringify(PaginatedAttendances, null, 4)
	// );

	let attendanceList = [];
	const [PagAttendances, setPagAttendances] = useState(PaginatedAttendances);

	const data = useMemo(() => {
		return PagAttendances.pageEdges.reduce(function (acc, pageEdge) {
			return acc.concat({ ...pageEdge.node });
		}, []);
	}, [PagAttendances]);

	const attendancesColumns = useMemo(
		() =>
			data[0]
				? Object.keys(data[0])
						.filter((key) => key !== "id")
						.map((key) => {
							if (key === "startAt" || key === "endAt") {
								return {
									Header: key,
									accessor: key,
									Cell: ({ value }) =>
										value === null ? "_" : format(new Date(value), "hh:mm a"),
								};
							}
							return { Header: key, accessor: key };
						})
				: [],
		[PaginatedAttendances]
	);

	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: "Edit",
				Header: "Edit",
				Cell: ({ row }) => {
					return (
						<button
							onClick={() => {
								alert("Note: " + row.values.note);
							}}
						>
							Edit
						</button>
					);
				},
			},
		]);
	};

	const tableInstance = useTable(
		{
			columns: attendancesColumns,
			data,
			initialState: { hiddenColumns: ["note"] },
		},
		tableHooks
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows, // Instead of using 'rows', we'll use page,
	} = tableInstance;

	const gotoPage = async (cursor) => {
		console.log("🚀 ~ file: attendance.tsx ~ line 79 ~ gotoPage ~ cursor", cursor);
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, {
			studentId: profileId,
			cursor,
			orderBy: "startAt",
			orderDirection: "desc",
			size: 3,
			buttonNum: 4,
		});
		if (result?.data?.data.PaginatedAttendances)
			setPagAttendances(result?.data?.data.PaginatedAttendances);
		console.log(
			"🚀 ~ file: attendance.tsx ~ line 88 ~ gotoPage ~ PaginatedAttendances",
			result?.data?.data.PaginatedAttendances
		);
	};

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
			<div className="flex items-center justify-center">
				<div className="flex flex-col items-center mb-8 px-4 mx-auto mt-8">
					<div className="font-sans flex justify-end items-center space-x-1 select-none whitespace-nowrap">
						<a
							href="#"
							className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
								PaginatedAttendances.pageCursors.first
									? "hover:bg-teal-400 hover:text-white"
									: ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={() => {
								if (!PaginatedAttendances.pageCursors.first) return;
								gotoPage(PaginatedAttendances.pageCursors.first.cursor);
							}}
						>
							First
						</a>
						<a
							href="#"
							className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
							style={{ transition: "all 0.2s ease" }}
							onClick={() => {
								if (!PaginatedAttendances.pageCursors.previous) return;
								gotoPage(PaginatedAttendances.pageCursors.previous.cursor);
							}}
						>
							Prev
						</a>
						<a
							href="#"
							className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
							style={{ transition: "all 0.2s ease" }}
							onClick={() => {
								if (!PaginatedAttendances.pageCursors.next) return;
								gotoPage(PaginatedAttendances.pageCursors.next.cursor);
							}}
						>
							Next
						</a>
						<a
							href="#"
							className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
								PaginatedAttendances.pageCursors.last
									? "hover:bg-teal-400 hover:text-white"
									: ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={() => {
								if (!PaginatedAttendances.pageCursors.last) return;
								gotoPage(PaginatedAttendances.pageCursors.last.cursor);
							}}
						>
							Last
						</a>
						{/* <span>
							Page{" "}
							<strong>
								{pageIndex + 1} of {PaginatedAttendances.totalCount.length}
							</strong>{" "}
						</span>
						<span>
							| Go to page:{" "}
							<input
								type="number"
								defaultValue={pageIndex + 1}
								onChange={(e) => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									gotoPage(page);
								}}
								style={{ width: "100px" }}
							/>
						</span>{" "}
						<select
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}
						>
							{[1, 2, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select> */}
					</div>
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
		size: 3,
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
