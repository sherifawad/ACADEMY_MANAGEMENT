import { GET_PAGINATED_STUDENT_ATTENDANCES } from "core/queries/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

function Attendance({ PaginatedAttendances, profileId }) {
	const {
		list,
		prevCursor,
		nextCursor,
		totalCount: { _count },
	} = PaginatedAttendances;

	const [firstResultId, setFirstResultId] = useState(list[0]?.id);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [canGoNext, setCanGoNext] = useState(true);
	const [canGoPrevious, setCanPrevious] = useState(false);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [paginationOption, setPaginationOption] = useState({
		studentId: profileId,
		myCursor: nextCursor,
		orderByKey: "note",
		orderDirection: "desc",
		size: 2,
		skip: null,
	});
	const [paginationResult, setPaginationResult] = useState({
		list,
		prevCursor,
		nextCursor,
	});

	const data = useMemo(() => {
		return paginationResult.list;
	}, [paginationResult.list]);

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
		[list]
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
			// initialState: { hiddenColumns: ["note"] },
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

	const gotoLast = async () => {
		if (isLastPage) return;
		const options = {
			...paginationOption,
			myCursor: null,
			size: -paginationOption.size,
			skip: null,
		};
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			setIsLastPage(true);
			setIsFirstPage(false);
			setCanGoNext(false);
			setCanPrevious(true);
			setCurrentPageNumber(Math.abs(Math.ceil(_count / paginationOption.size)));
		}
	};

	const gotoFirst = async () => {
		if (isFirstPage) return;
		const options = {
			...paginationOption,
			myCursor: null,
			size: paginationOption.size,
			skip: null,
		};
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			setIsFirstPage(true);
			setCanGoNext(true);
			setIsLastPage(false);
			setCanPrevious(false);
			setCurrentPageNumber(1);
		}
	};

	const gotoNext = async () => {
		if (!canGoNext) return;
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, paginationOption);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			if (currentPageNumber + 1 === Math.abs(Math.ceil(_count / paginationOption.size))) {
				setCanGoNext(false);
				setIsLastPage(true);
			}
			setIsFirstPage(false);
			setCanPrevious(true);
			setCurrentPageNumber(currentPageNumber + 1);
		}
	};

	const gotoPrevious = async () => {
		if (!canGoPrevious) return;
		let options = {
			...paginationOption,
			myCursor: paginationResult.prevCursor,
			size: -paginationOption.size,
		};
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			if (currentPageNumber - 1 === 1) {
				setCanPrevious(false);
				setIsFirstPage(true);
			}
			setCanGoNext(true);
			setIsLastPage(false);
			setCurrentPageNumber(currentPageNumber - 1);
		}
	};

	const gotoPage = async (cursor: string | null, previous: boolean = false) => {
		let options = {
			...paginationOption,
			myCursor: cursor,
			size: previous ? -paginationOption.size : paginationOption.size,
		};
		if (!cursor && previous && isLastPage) {
			options = {
				...options,
				size: -paginationOption.size * 2,
				skip: paginationOption.size,
			};
		}
		setPaginationOption(options);
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (!list || list.length <= 0) {
			setPaginationResult({
				...paginationResult,
				nextCursor: null,
				prevCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: null,
			});
		} else {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
		}

		let PageNumber: number = currentPageNumber;

		if (!cursor && previous && !isLastPage) {
			PageNumber = Math.abs(Math.ceil(_count / paginationOption.size));
			setIsLastPage(true);
		} else if (!cursor) {
			PageNumber = 1;
		} else if (previous) {
			PageNumber = Math.abs(PageNumber === 1 ? PageNumber : PageNumber - 1);
		} else if (!list || list.length <= 0) {
		} else {
			PageNumber = Math.abs(PageNumber + 1);
		}
		setCurrentPageNumber(Math.abs(PageNumber));

		if (PageNumber === Math.abs(Math.ceil(_count / paginationOption.size))) {
			setIsLastPage(true);
		} else {
			setIsLastPage(false);
		}
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
								isFirstPage ? "" : "hover:bg-teal-400 hover:text-white"
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={gotoFirst}
						>
							First
						</a>
						<a
							href="#"
							className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
								canGoPrevious ? "hover:bg-teal-400 hover:text-white" : ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={gotoPrevious}
						>
							Prev
						</a>
						<a
							href="#"
							className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
								canGoNext ? "hover:bg-teal-400 hover:text-white" : ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={gotoNext}
						>
							Next
						</a>
						<a
							href="#"
							className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
								!isLastPage ? "hover:bg-teal-400 hover:text-white" : ""
							}`}
							style={{ transition: "all 0.2s ease" }}
							onClick={gotoLast}
						>
							Last
						</a>
						<span>
							Page{" "}
							<strong>
								{Math.abs(currentPageNumber)} of{" "}
								{Math.abs(Math.ceil(_count / paginationOption.size))}
							</strong>{" "}
						</span>
						{/*<span>
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
		myCursor: null,
		orderByKey: "note",
		orderDirection: "desc",
		size: 2,
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
