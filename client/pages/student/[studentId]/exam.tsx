import { GET_STUDENT_EXAMS } from "core/queries/examsQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { format } from "date-fns";

function studentExams({ exams = [] }) {
	const columns = useMemo(
		() => [
			{
				Header: "Date",

				accessor: "date", // accessor is the "key" in the data
			},

			{
				Header: "Score",

				accessor: "score",
			},
		],

		[]
	);

	const examsColumns = useMemo(
		() =>
			exams[0]
				? Object.keys(exams[0])
						.filter((key) => key !== "id")
						.map((key) => {
							if (key === "date") {
								return {
									Header: key,
									accessor: key,
									Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
								};
							}
							return { Header: key, accessor: key };
						})
				: [],
		[exams]
	);

	const data = useMemo(() => exams, [exams]);

	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: "Edit",
				Header: "Edit",
				Cell: ({ row }) => <button onClick={() => alert("Score: " + row.values.score)}>Edit</button>,
			},
		]);
	};

	const tableInstance = useTable(
		{ columns: examsColumns, data, initialState: { pageIndex: 0 } },
		tableHooks,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = tableInstance;

	return (
		<div className="container">
			<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
				<div className="w-full overflow-x-auto">
					<table {...getTableProps()} className="w-full">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
							{headerGroups.map((headerGroup) => (
								<tr
									{...headerGroup.getHeaderGroupProps()}
									className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
								>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
											className="px-4 py-3"
										>
											{column.render("Header")}
											<span>
												{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
											</span>
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody {...getTableBodyProps()} className="bg-white">
							{page.map((row) => {
								prepareRow(row);

								return (
									<tr {...row.getRowProps()} className="text-gray-700">
										{row.cells.map((cell) => {
											return (
												<td
													{...cell.getCellProps()}
													className="px-4 py-3 border"
												>
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
			<div className="flex items-center justify-center py-8 whitespace-nowrap">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>{" "}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{"<"}
				</button>{" "}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{">>"}
				</button>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
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
				</select>
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
	const result = await createAxiosService(GET_STUDENT_EXAMS, { studentId: params.studentId });

	if (result?.data?.data) {
		return { props: { exams: result?.data?.data.UserExams } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default studentExams;
