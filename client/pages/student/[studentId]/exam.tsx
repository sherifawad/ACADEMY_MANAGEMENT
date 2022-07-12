import { GET_STUDENT_EXAMS } from "core/queries/examsQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { format } from "date-fns";
import AddModel from "components/AddModel";
import AddExam from "components/AddExam";
import { useRouter } from "next/router";

function studentExams({ exams = [], profileId }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isOpened, setIsOpened] = useState(false);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// Call this function whenever you want to
	// refresh props!

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		console.log("close clicked");
	};

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
		<div className="container grid">
			<AddModel isOpened={isOpened} onClose={onClose} title="Add Exam">
				<AddExam onProceed={onProceed} onClose={onClose} profileId={profileId} />
			</AddModel>

			<div
				className="text-md px-6 py-2 w-32 text-center rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer justify-self-end"
				text-indigo-50
				font-semibold
				cursor-pointer
				onClick={() => setIsOpened(true)}
			>
				Add
			</div>
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
								canPreviousPage ? "hover:bg-teal-400 hover:text-white" : ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={() => gotoPage(0)}
						>
							First
						</a>
						<a
							href="#"
							className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
							style={{ transition: "all 0.2s ease" }}
							onClick={() => previousPage()}
						>
							Prev
						</a>
						<a
							href="#"
							className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white"
							style={{ transition: "all 0.2s ease" }}
							onClick={() => nextPage()}
						>
							Next
						</a>
						<a
							href="#"
							className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
								canNextPage ? "hover:bg-teal-400 hover:text-white" : ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={() => gotoPage(pageCount - 1)}
						>
							Last
						</a>
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
		return { props: { exams: result?.data?.data.UserExams, profileId: params.studentId } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default studentExams;
